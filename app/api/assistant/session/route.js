import { NextResponse } from 'next/server';
import { getOrCreateVisitorSession } from '@/lib/telemetry';

export async function POST(request) {
  try {
    const cookieSessionId = request.cookies.get('stockflow_visitor_session_id')?.value || null;
    const sessionData = await getOrCreateVisitorSession(request, cookieSessionId);

    const response = NextResponse.json({
      success: true,
      sessionId: sessionData.sessionId,
      country: sessionData.country,
      city: sessionData.city,
      deviceType: sessionData.deviceType,
    });

    // Set 30-day session cookie
    response.cookies.set('stockflow_visitor_session_id', sessionData.sessionId, {
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
      sameSite: 'lax',
      httpOnly: false, // accessible to client JS for telemetry sync
    });

    return response;
  } catch (error) {
    console.error('[Session API Error]:', error);
    return NextResponse.json({ error: 'Failed to initialize session' }, { status: 500 });
  }
}
