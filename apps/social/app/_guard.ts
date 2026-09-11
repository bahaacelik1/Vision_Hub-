import { redirect } from 'next/navigation';
import { auth } from '@vision/auth';

const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL ?? 'http://localhost:3000';

export async function requireSocialUser() {
  const session = await auth();
  if (!session?.user) redirect(`${GATEWAY_URL}/signin`);
  const defaultMode = (session.user as { defaultMode?: 'HUB' | 'SOCIAL' | null }).defaultMode;
  if (!defaultMode) redirect(`${GATEWAY_URL}/select-mode`);
  return {
    name: session.user.name ?? session.user.email ?? 'Öğrenci',
    email: session.user.email ?? '',
  };
}
