import { NextResponse } from 'next/server';
import { prisma } from '@vision/database';
import { requireUser } from '../_helpers';

/**
 * GET /api/messages/users?q=elif
 * Yeni sohbet başlatmak için kullanıcı arama.
 * Kendini hariç tutar, ad veya e-postada substring eşleşmesi.
 */
export async function GET(req: Request) {
  const g = await requireUser();
  if ('error' in g) return g.error;

  const q = new URL(req.url).searchParams.get('q')?.trim() ?? '';
  const users = await prisma.user.findMany({
    where: {
      id: { not: g.userId },
      ...(q
        ? {
            OR: [
              { email: { contains: q, mode: 'insensitive' } },
              { profile: { displayName: { contains: q, mode: 'insensitive' } } },
            ],
          }
        : {}),
    },
    take: 15,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      email: true,
      profile: { select: { displayName: true, university: { select: { name: true } } } },
    },
  });

  return NextResponse.json({
    users: users.map((u) => ({
      id: u.id,
      name: u.profile?.displayName ?? u.email,
      email: u.email,
      university: u.profile?.university?.name ?? '',
    })),
  });
}
