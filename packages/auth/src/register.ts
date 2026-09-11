import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@vision/database';

export const RegisterInput = z.object({
  name: z.string().min(2, 'Ad en az 2 karakter olmalı').max(120),
  email: z.string().email('Geçersiz e-posta'),
  password: z.string().min(8, 'Şifre en az 8 karakter olmalı'),
});

export type RegisterInput = z.infer<typeof RegisterInput>;

export async function registerUser(input: RegisterInput) {
  const parsed = RegisterInput.parse(input);
  const email = parsed.email.toLowerCase();

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error('Bu e-posta ile bir hesap zaten var');
  }

  const passwordHash = await bcrypt.hash(parsed.password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      role: 'STUDENT',
      profile: {
        create: {
          displayName: parsed.name,
          interests: [],
          skills: [],
        },
      },
    },
  });

  return { id: user.id, email: user.email };
}
