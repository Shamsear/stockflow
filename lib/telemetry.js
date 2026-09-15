import { dbPool } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

/**
 * Parses user agent to detect clean device classification
 */
export function detectDevice(userAgent = '') {
  const ua = userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'Tablet';
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua)) {
    return 'Mobile';
  }
  return 'Desktop';
}

/**
 * Detects visitor country name from standard proxy / CDN headers or fallback
 */
export function resolveGeoLocation(request) {
  const countryCode = (
    request.headers.get('x-vercel-ip-country') || 
    request.headers.get('cf-ipcountry') || 
    request.headers.get('x-country-code') || 
    'QA'
  ).toUpperCase();

  const city = (
    request.headers.get('x-vercel-ip-city') || 
    request.headers.get('cf-ipcity') || 
    'Doha'
  );

  const countryMap = {
    'QA': 'Qatar',
    'AE': 'United Arab Emirates',
    'SA': 'Saudi Arabia',
    'KW': 'Kuwait',
    'OM': 'Oman',
    'BH': 'Bahrain',
    'US': 'United States',
    'GB': 'United Kingdom',
    'IN': 'India',
  };

  return {
    countryCode,
    country: countryMap[countryCode] || countryCode,
    city: decodeURIComponent(city)
  };
}

/**
 * Initializes or retrieves an active demo visitor session
 */
export async function getOrCreateVisitorSession(request, cookieSessionId = null) {
  const userAgent = request.headers.get('user-agent') || '';
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
  const referrer = request.headers.get('referer') || 'Direct';
  const { country, countryCode, city } = resolveGeoLocation(request);
  const deviceType = detectDevice(userAgent);

  let sessionId = cookieSessionId;

  if (sessionId) {
    try {
      const existing = await dbPool.query(
        'SELECT id FROM "DemoVisitorSession" WHERE id = $1 LIMIT 1',
        [sessionId]
      );
      if (existing.rows.length > 0) {
        await dbPool.query(
          'UPDATE "DemoVisitorSession" SET "lastActiveAt" = CURRENT_TIMESTAMP WHERE id = $1',
          [sessionId]
        );
        return { sessionId, isNew: false };
      }
    } catch (e) {
      console.error('[Telemetry] Existing session query error:', e.message);
    }
  }

  // Create new session
  sessionId = 'sess_' + uuidv4().replace(/-/g, '').slice(0, 16);

  try {
    await dbPool.query(`
      INSERT INTO "DemoVisitorSession" (
        id, ip, country, "countryCode", city, "deviceType", referrer, "startedAt", "lastActiveAt"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `, [sessionId, ip, country, countryCode, city, deviceType, referrer]);

    return { sessionId, isNew: true, country, city, deviceType };
  } catch (err) {
    console.error('[Telemetry] Session creation error:', err.message);
    return { sessionId, isNew: true, fallback: true };
  }
}

/**
 * Records progression on a specific tour step
 */
export async function recordTourStep(sessionId, stepKey, action = 'completed', durationSeconds = null) {
  if (!sessionId) return;
  const eventId = 'evt_' + uuidv4().replace(/-/g, '').slice(0, 16);

  try {
    // 1. Log step event
    await dbPool.query(`
      INSERT INTO "DemoStepEvent" (
        id, "sessionId", "stepKey", action, "durationSeconds", "createdAt"
      ) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
    `, [eventId, sessionId, stepKey, action, durationSeconds]);

    // 2. If completed, append to completedSteps array if not already present
    if (action === 'completed') {
      await dbPool.query(`
        UPDATE "DemoVisitorSession"
        SET 
          "completedSteps" = array_append(
            array_remove("completedSteps", $2),
            $2
          ),
          "totalStepsCount" = cardinality(array_append(array_remove("completedSteps", $2), $2)),
          "lastActiveAt" = CURRENT_TIMESTAMP
        WHERE id = $1
      `, [sessionId, stepKey]);

      // Check if all 5 key steps are completed
      const check = await dbPool.query(`
        SELECT "completedSteps" FROM "DemoVisitorSession" WHERE id = $1
      `, [sessionId]);

      const steps = check.rows[0]?.completedSteps || [];
      const requiredSteps = ['inbound', 'fefo', 'outbound', 'pdf', 'reports'];
      const allDone = requiredSteps.every(st => steps.includes(st));

      if (allDone) {
        await dbPool.query(`
          UPDATE "DemoVisitorSession" SET "completedTour" = true WHERE id = $1
        `, [sessionId]);
      }
    }
  } catch (err) {
    console.error('[Telemetry] Record tour step error:', err.message);
  }
}

/**
 * Saves client feedback rating
 */
export async function recordSatisfaction(sessionId, rating, feedback = '') {
  if (!sessionId) return;
  try {
    await dbPool.query(`
      UPDATE "DemoVisitorSession"
      SET 
        "satisfactionRating" = $2,
        "feedbackComment" = $3,
        "lastActiveAt" = CURRENT_TIMESTAMP
      WHERE id = $1
    `, [sessionId, rating, feedback]);
  } catch (err) {
    console.error('[Telemetry] Record satisfaction error:', err.message);
  }
}

/**
 * Records when visitor clicks to connect on WhatsApp
 */
export async function recordWhatsAppClick(sessionId, leadData = {}) {
  if (!sessionId) return;
  try {
    await dbPool.query(`
      UPDATE "DemoVisitorSession"
      SET 
        "clickedWhatsApp" = true,
        "leadName" = COALESCE($2, "leadName"),
        "leadCompany" = COALESCE($3, "leadCompany"),
        "leadPhone" = COALESCE($4, "leadPhone"),
        "lastActiveAt" = CURRENT_TIMESTAMP
      WHERE id = $1
    `, [sessionId, leadData.name || null, leadData.company || null, leadData.phone || null]);
  } catch (err) {
    console.error('[Telemetry] Record WhatsApp error:', err.message);
  }
}

/**
 * Updates visitor profile (name, company, location) collected at start of walkthrough
 */
export async function updateVisitorProfile(sessionId, { name, company, location } = {}) {
  if (!sessionId) return;
  try {
    await dbPool.query(`
      UPDATE "DemoVisitorSession"
      SET 
        "leadName" = COALESCE(NULLIF($2, ''), "leadName"),
        "leadCompany" = COALESCE(NULLIF($3, ''), "leadCompany"),
        "city" = COALESCE(NULLIF($4, ''), "city"),
        "lastActiveAt" = CURRENT_TIMESTAMP
      WHERE id = $1
    `, [sessionId, name || null, company || null, location || null]);
  } catch (err) {
    console.error('[Telemetry] Update visitor profile error:', err.message);
  }
}

/**
 * Saves a chat question or response
 */
export async function saveDemoChatMessage(sessionId, role, content) {
  if (!sessionId || !content) return;
  const msgId = 'msg_' + uuidv4().replace(/-/g, '').slice(0, 16);

  try {
    await dbPool.query(`
      INSERT INTO "DemoChatMessage" (
        id, "sessionId", role, content, "createdAt"
      ) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
    `, [msgId, sessionId, role, content]);
  } catch (err) {
    console.error('[Telemetry] Save chat message error:', err.message);
  }
}

/**
 * Aggregates all telemetry for the executive /admin analytics portal
 */
export async function getAdminAnalytics() {
  try {
    // 1. Overall KPIs
    const kpiRes = await dbPool.query(`
      SELECT 
        COUNT(*)::int AS "totalVisitors",
        COUNT(CASE WHEN "completedTour" = true THEN 1 END)::int AS "completedTourCount",
        COUNT(CASE WHEN "clickedWhatsApp" = true THEN 1 END)::int AS "whatsAppClicks",
        COALESCE(ROUND(AVG("satisfactionRating"), 1), 0)::float AS "averageRating",
        COUNT(CASE WHEN "satisfactionRating" IS NOT NULL THEN 1 END)::int AS "ratedSessionsCount"
      FROM "DemoVisitorSession"
    `);

    // 2. Step Funnel
    const funnelStepsOrder = [
      { key: 'inbound', label: 'Inbound PO Receiving' },
      { key: 'fefo', label: 'FEFO Expiry Control' },
      { key: 'outbound', label: 'Outbound Picking' },
      { key: 'pdf', label: 'Delivery Note POD' },
      { key: 'reports', label: 'Inventory Reports' },
    ];

    const funnelRes = await dbPool.query(`
      SELECT unnest("completedSteps") AS step_key, COUNT(*)::int AS count
      FROM "DemoVisitorSession"
      GROUP BY step_key
    `);

    const funnelCounts = {};
    for (const r of funnelRes.rows) {
      funnelCounts[r.step_key] = r.count;
    }

    const funnel = funnelStepsOrder.map(st => ({
      key: st.key,
      label: st.label,
      count: funnelCounts[st.key] || 0
    }));

    // 3. Geographic Breakdown
    const geoRes = await dbPool.query(`
      SELECT COALESCE(country, 'Unknown') AS country, COUNT(*)::int AS count
      FROM "DemoVisitorSession"
      GROUP BY country
      ORDER BY count DESC
      LIMIT 8
    `);

    // 4. Device Breakdown
    const deviceRes = await dbPool.query(`
      SELECT COALESCE("deviceType", 'Desktop') AS device, COUNT(*)::int AS count
      FROM "DemoVisitorSession"
      GROUP BY "deviceType"
      ORDER BY count DESC
    `);

    // 5. Recent Sessions (with chat count)
    const sessionsRes = await dbPool.query(`
      SELECT 
        s.id,
        s.country,
        s.city,
        s."deviceType",
        s."startedAt",
        s."lastActiveAt",
        s."completedTour",
        s."completedSteps",
        s."satisfactionRating",
        s."feedbackComment",
        s."clickedWhatsApp",
        s."leadName",
        s."leadCompany",
        COUNT(m.id)::int AS "messagesCount"
      FROM "DemoVisitorSession" s
      LEFT JOIN "DemoChatMessage" m ON s.id = m."sessionId"
      GROUP BY s.id
      ORDER BY s."lastActiveAt" DESC
      LIMIT 30
    `);

    return {
      kpis: {
        totalVisitors: kpiRes.rows[0]?.totalVisitors || 0,
        completedTourCount: kpiRes.rows[0]?.completedTourCount || 0,
        completionRate: kpiRes.rows[0]?.totalVisitors > 0 
          ? Math.round((kpiRes.rows[0].completedTourCount / kpiRes.rows[0].totalVisitors) * 100) 
          : 0,
        whatsAppClicks: kpiRes.rows[0]?.whatsAppClicks || 0,
        conversionRate: kpiRes.rows[0]?.totalVisitors > 0 
          ? Math.round((kpiRes.rows[0].whatsAppClicks / kpiRes.rows[0].totalVisitors) * 100) 
          : 0,
        averageRating: kpiRes.rows[0]?.averageRating || 0,
        ratedSessionsCount: kpiRes.rows[0]?.ratedSessionsCount || 0,
      },
      funnel,
      geography: geoRes.rows,
      devices: deviceRes.rows,
      recentSessions: sessionsRes.rows
    };
  } catch (err) {
    console.error('[Telemetry] Analytics query error:', err.message);
    return {
      kpis: { totalVisitors: 0, completedTourCount: 0, completionRate: 0, whatsAppClicks: 0, conversionRate: 0, averageRating: 0, ratedSessionsCount: 0 },
      funnel: [],
      geography: [],
      devices: [],
      recentSessions: []
    };
  }
}
