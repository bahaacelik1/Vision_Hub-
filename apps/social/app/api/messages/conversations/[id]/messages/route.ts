import { NextResponse } from 'next/server';
import { prisma } from '@vision/database';
import { assertParticipant, requireUser } from '../../../_helpers';

/**
 * POST /api/messages/conversations/:id/messages
 * body: { text }
 * Konuşmaya yeni mesaj ekler ve lastMessageAt'ı günceller.
 */
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const g = await requireUser();
  if ('error' in g) return g.error;

  const { id } = await ctx.params;
  const ok = await assertParticipant(id, g.userId);
  if (!ok) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 });

  const body = (await req.json().catch(() => ({}))) as { text?: string };
  const text = (body.text ?? '').trim().slice(0, 4000);
  if (!text) return NextResponse.json({ error: 'Boş mesaj' }, { status: 400 });

  const msg = await prisma.message.create({
    data: { conversationId: id, authorId: g.userId, body: text },
    select: { id: true, body: true, createdAt: true, authorId: true },
  });
  await prisma.conversation.update({
    where: { id },
    data: { lastMessageAt: msg.createdAt },
  });

  return NextResponse.json({
    id: msg.id,
    body: msg.body,
    createdAt: msg.createdAt,
    mine: true,
  });
}
