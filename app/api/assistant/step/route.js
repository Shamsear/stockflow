import { NextResponse } from 'next/server';
import { 
  recordTourStep, 
  recordSatisfaction, 
  recordWhatsAppClick 
} from '@/lib/telemetry';

export async function POST(request) {
  try {
    const body = await request.json();
    const cookieSessionId = request.cookies.get('stockflow_visitor_session_id')?.value;
    const sessionId = body.sessionId || cookieSessionId;

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
    }

    // 1. Record step progression if provided
    if (body.stepKey) {
      await recordTourStep(
        sessionId, 
        body.stepKey, 
        body.action || 'completed', 
        body.durationSeconds || null
      );
    }

    // 2. Record rating / feedback if provided
    if (body.rating != null) {
      await recordSatisfaction(sessionId, Number(body.rating), body.feedback || '');
    }

    // 3. Record WhatsApp click if triggered
    if (body.clickedWhatsApp) {
      await recordWhatsAppClick(sessionId, body.leadData || {});
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Step API Error]:', error);
    return NextResponse.json({ error: 'Failed to record step event' }, { status: 500 });
  }
}
