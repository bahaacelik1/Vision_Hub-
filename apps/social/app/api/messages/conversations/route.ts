import { NextResponse } from 'next/server';
import { prisma } from '@vision/database';
import { requireUser } from '../_helpers';

/**
 * GET /api/messages/conversations
 * Oturumdaki kullanıcının konuşmaları — karşı taraf ismi, son mesaj, okunmamış sayısı.
 */
export async function GET() {
  const g = await requireUser();
  if ('error' in g) return g.error;

  const parts = await prisma.conversationParticipant.findMany({
    where: { userId: g.userId },
    orderBy: { conversation: { lastMessageAt: 'desc' } },
    include: {
      conversation: {
        include: {
          participants: {
            include: { user: { include: { profile: { select: { displayName: true, university: { select: { name: true } } } } } } },
          },
          messages: {
            orderBy: { createdAt: 'desc' },
            take: 1,
            select: { body: true, createdAt: true, authorId: true },
          },
        },
      },
    },
  });

  const conversations = parts.map((p) => {
    const peer = p.conversation.participants.find((x) => x.userId !== g.userId);
    const peerProfile = peer?.user.profile;
    const last = p.conversation.messages[0];
    return {
      id: p.conversation.id,
      peer: peer && {
        id: peer.userId,
        name: peerProfile?.displayName ?? peer.user.email,
        university: peerProfile?.university?.name ?? '',
      },
      lastMessage: last
        ? { body: last.body, createdAt: last.createdAt, mine: last.authorId === g.userId }
        : null,
      lastMessageAt: p.conversation.lastMessageAt,
      lastReadAt: p.lastReadAt,
    };
  });

  return NextResponse.json({ conversations });
}

/**
 * POST /api/messages/conversations
 * body: { peerUserId, text? }
 * Var olan 1-1 konuşmayı bulur, yoksa yaratır. Metin verilirse ilk mesajı ekler.
 * Döner: { conversationId }
 */
export async function POST(req: Request) {
  const g = await requireUser();
  if ('error' in g) return g.error;

  const body = (await req.json().catch(() => ({}))) as { peerUserId?: string; text?: string };
  const peerId = body.peerUserId;
  if (!peerId || peerId === g.userId) {
    return NextResponse.json({ error: 'Geçersiz peer' }, { status: 400 });
  }

  // Var olan 1-1 konuşma?
  const existing = await prisma.conversation.findFirst({
    where: {
      AND: [
        { participants: { some: { userId: g.userId } } },
        { participants: { some: { userId: peerId } } },
      ],
    },
    include: { participants: true },
  });

  let conversationId: string;
  if (existing && existing.participants.length === 2) {
    conversationId = existing.id;
  } else {
    const created = await prisma.conversation.create({
      data: {
        participants: {
          create: [{ userId: g.userId }, { userId: peerId }],
        },
      },
    });
    conversationId = created.id;
  }

  if (body.text && body.text.trim()) {
    const msg = await prisma.message.create({
      data: {
        conversationId,
        authorId: g.userId,
        body: body.text.trim().slice(0, 4000),
      },
    });
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { lastMessageAt: msg.createdAt },
    });
  }

  return NextResponse.json({ conversationId });
}
