import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@vision/database';

/**
 * Vision Ekosistemi — NextAuth v5 konfigürasyonu.
 *
 * - JWT session strategy (edge-compatible + cross-app kolay)
 * - Aynı cookie tüm localhost portlarında paylaşılır (path=/, name aynı)
 * - Credentials provider bcrypt ile şifre karşılaştırır
 */
export const authConfig = {
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/signin',
  },
  providers: [
    Credentials({
      name: 'Vision',
      credentials: {
        email: { label: 'E-posta', type: 'email' },
        password: { label: 'Şifre', type: 'password' },
      },
      async authorize(raw) {
        const parsed = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(raw);
        if (!parsed.success) return null;

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email.toLowerCase() },
          include: { profile: true },
        });
        if (!user) return null;

        const ok = await bcrypt.compare(parsed.data.password, user.passwordHash);
        if (!ok) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.profile?.displayName ?? user.email,
          role: user.role,
          defaultMode: user.profile?.defaultMode ?? null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = (user as { id: string }).id;
        token.role = (user as { role?: string }).role;
        token.defaultMode = (user as { defaultMode?: 'HUB' | 'SOCIAL' | null }).defaultMode ?? null;
      }
      // Kullanıcı select-mode'ta seçim yaptığında session'ı refresh ederiz —
      // JWT'de defaultMode yoksa DB'den taze oku.
      if ((trigger === 'update' || !token.defaultMode) && token.id) {
        const profile = await prisma.profile.findUnique({
          where: { userId: token.id as string },
          select: { defaultMode: true },
        });
        token.defaultMode = profile?.defaultMode ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
        (session.user as { defaultMode?: 'HUB' | 'SOCIAL' | null }).defaultMode =
          (token.defaultMode as 'HUB' | 'SOCIAL' | null) ?? null;
      }
      return session;
    },
  },
  trustHost: true,
} satisfies NextAuthConfig;
