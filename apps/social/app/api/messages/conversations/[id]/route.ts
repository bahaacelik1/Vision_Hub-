import { NextResponse } from 'next/server';
import { prisma } from '@vision/database';
import { assertParticipant, requireUser } from '../../_helpers';

/**
 * GET /api/messages/conversations/:id
 * Konuşma detayları + mesaj listesi (chronological).
 * lastReadAt güncellenir — okundu.
 */
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const g = await requireUser();
  if ('error' in g) return g.error;

  const { id } = await ctx.params;
  const ok = await assertParticipant(id, g.userId);
  if (!ok) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 });

  const [messages, peerPart] = await Promise.all([
    prisma.message.findMany({
      where: { conversationId: id },
      orderBy: { createdAt: 'asc' },
      take: 200,
      select: { id: true, body: true, createdAt: true, authorId: true },
    }),
    prisma.conversationParticipant.findFirst({
      where: { conversationId: id, userId: { not: g.userId } },
      include: {
        user: { include: { profile: { select: { displayName: true, university: { select: { name: true } } } } } },
      },
    }),
  ]);

  // Okundu işaretle
  await prisma.conversationParticipant.update({
    where: { conversationId_userId: { conversationId: id, userId: g.userId } },
    data: { lastReadAt: new Date() },
  });

  const peerProfile = peerPart?.user.profile;
  return NextResponse.json({
    id,
    peer: peerPart
      ? {
          id: peerPart.userId,
          name: peerProfile?.displayName ?? peerPart.user.email,
          university: peerProfile?.university?.name ?? '',
        }
      : null,
    messages: messages.map((m) => ({
      id: m.id,
      body: m.body,
      createdAt: m.createdAt,
      mine: m.authorId === g.userId,
    })),
  });
}
