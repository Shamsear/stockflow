import { NextResponse } from 'next/server';
import { updateVisitorProfile } from '@/lib/telemetry';

export async function POST(request) {
  try {
    const { sessionId, name, company, location } = await request.json();
    if (sessionId) {
      await updateVisitorProfile(sessionId, { name, company, location });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Profile API Error]:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
