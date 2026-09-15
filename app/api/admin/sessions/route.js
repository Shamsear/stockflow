import { NextResponse } from 'next/server';
import { dbPool } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('id');
    const deleteAll = searchParams.get('all') === 'true';

    if (deleteAll) {
      await dbPool.query('DELETE FROM "DemoChatMessage"');
      await dbPool.query('DELETE FROM "DemoStepEvent"');
      await dbPool.query('DELETE FROM "DemoVisitorSession"');
      return NextResponse.json({ success: true, message: 'All demo visitor sessions cleared' });
    }

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing sessionId parameter' }, { status: 400 });
    }

    await dbPool.query('DELETE FROM "DemoChatMessage" WHERE "sessionId" = $1', [sessionId]);
    await dbPool.query('DELETE FROM "DemoStepEvent" WHERE "sessionId" = $1', [sessionId]);
    const res = await dbPool.query('DELETE FROM "DemoVisitorSession" WHERE id = $1', [sessionId]);

    return NextResponse.json({
      success: true,
      deletedCount: res.rowCount,
      sessionId
    });
  } catch (err) {
    console.error('[Admin API] Delete session error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
