import { NextResponse } from 'next/server';
import { auth } from '@vision/auth';
import { prisma } from '@vision/database';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  }
  const body = (await req.json().catch(() => ({}))) as { mode?: string };
  if (body.mode !== 'HUB' && body.mode !== 'SOCIAL') {
    return NextResponse.json({ error: 'Geçersiz mod' }, { status: 400 });
  }
  const userId = (session.user as { id: string }).id;
  await prisma.profile.update({
    where: { userId },
    data: { defaultMode: body.mode },
  });
  return NextResponse.json({ ok: true, defaultMode: body.mode });
}
