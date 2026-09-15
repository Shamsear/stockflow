import { NextResponse } from 'next/server';
import { dbPool } from '@/lib/prisma';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
  }

  try {
    const res = await dbPool.query(`
      SELECT id, role, content, "createdAt"
      FROM "DemoChatMessage"
      WHERE "sessionId" = $1
      ORDER BY "createdAt" ASC
    `, [sessionId]);

    return NextResponse.json({ messages: res.rows });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
