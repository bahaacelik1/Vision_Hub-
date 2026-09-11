// Vision seed: test kullanıcılar + Baha ile ön-konuşmalar.
// Çalıştır: pnpm --filter @vision/database exec node scripts/seed.mjs
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function ensureUser(email, name, university) {
  const passwordHash = await bcrypt.hash('vision123', 10);
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return existing;
  return prisma.user.create({
    data: {
      email,
      passwordHash,
      role: 'STUDENT',
      profile: {
        create: {
          displayName: name,
          interests: [],
          skills: [],
          defaultMode: 'SOCIAL',
        },
      },
    },
  });
}

async function seedConversation(a, b, seedMessages) {
  const existing = await prisma.conversation.findFirst({
    where: {
      AND: [
        { participants: { some: { userId: a.id } } },
        { participants: { some: { userId: b.id } } },
      ],
    },
  });
  const conv = existing ?? (await prisma.conversation.create({
    data: {
      participants: { create: [{ userId: a.id }, { userId: b.id }] },
    },
  }));

  const count = await prisma.message.count({ where: { conversationId: conv.id } });
  if (count > 0) return conv;

  const now = Date.now();
  for (let i = 0; i < seedMessages.length; i++) {
    const m = seedMessages[i];
    await prisma.message.create({
      data: {
        conversationId: conv.id,
        authorId: m.from === 'a' ? a.id : b.id,
        body: m.body,
        createdAt: new Date(now - (seedMessages.length - i) * 60_000),
      },
    });
  }
  await prisma.conversation.update({
    where: { id: conv.id },
    data: { lastMessageAt: new Date() },
  });
  return conv;
}

async function main() {
  const baha = await prisma.user.findUnique({ where: { email: 'baha@vision.dev' } });
  if (!baha) {
    console.log('baha@vision.dev bulunamadı, kayıt ekranından oluşturup tekrar dene.');
    return;
  }

  const elif = await ensureUser('elif@vision.dev', 'Elif Yılmaz', 'ODTÜ');
  const ahmet = await ensureUser('ahmet@vision.dev', 'Ahmet Kaya', 'İTÜ');

  await seedConversation(baha, elif, [
    { from: 'b', body: 'Selam Baha! Portfolyona bakıyorum, çok temiz olmuş 🙌' },
    { from: 'a', body: 'Teşekkür ederim Elif, senden gelmesi ayrı değerli.' },
    { from: 'b', body: 'Yarın kampüste kahve içelim mi?' },
    { from: 'a', body: '14:00 uygun mu?' },
    { from: 'b', body: '14:00 harika 👍' },
  ]);

  await seedConversation(baha, ahmet, [
    { from: 'b', body: 'CFD raporunu attım, göz gezdirir misin?' },
    { from: 'a', body: 'Hemen bakıyorum, ekipmanı da düşündüm bu arada.' },
  ]);

  console.log('Seed tamam. Test hesapları:');
  console.log('- elif@vision.dev / vision123');
  console.log('- ahmet@vision.dev / vision123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
