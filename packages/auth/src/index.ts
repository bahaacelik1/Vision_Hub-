/**
 * Vision Auth — ortak kimlik yapısı.
 *
 * Uygulama: NextAuth v5 veya Better-Auth üzerine kurulacak.
 * Şu an sadece paylaşılan tipler ve session helper yer tutucu.
 */
import type { UserRole } from '@vision/types';

export interface Session {
  userId: string;
  email: string;
  role: UserRole;
  expiresAt: number;
}

export interface AuthProvider {
  getSession(): Promise<Session | null>;
  signIn(email: string, password: string): Promise<Session>;
  signOut(): Promise<void>;
}
