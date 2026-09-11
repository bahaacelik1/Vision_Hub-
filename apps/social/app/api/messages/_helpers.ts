import { NextResponse } from 'next/server';
import { auth } from '@vision/auth';
import { prisma } from '@vision/database';

/**
 * Oturum kontrolü — yoksa 401 döner.
 */
export async function requireUser() {
  const session = await auth();
  if (!session?.user) {
    return { error: NextResponse.json({ error: 'Yetkisiz' }, { status: 401 }) };
  }
  const id = (session.user as { id?: string }).id;
  if (!id) {
    return { error: NextResponse.json({ error: 'Yetkisiz' }, { status: 401 }) };
  }
  return { userId: id };
}

/**
 * Verilen kullanıcının konuşmanın parçası olduğunu doğrular.
 */
export async function assertParticipant(conversationId: string, userId: string) {
  const p = await prisma.conversationParticipant.findUnique({
    where: { conversationId_userId: { conversationId, userId } },
  });
  return !!p;
}
