import { redirect } from 'next/navigation';
import { auth } from '@vision/auth';

const HUB_URL    = process.env.NEXT_PUBLIC_HUB_URL    ?? 'http://localhost:3001';
const SOCIAL_URL = process.env.NEXT_PUBLIC_SOCIAL_URL ?? 'http://localhost:3002';

/**
 * Sign-in başarılı olduktan sonra tek noktadan yönlendirme.
 * - Session yok → /signin
 * - defaultMode yok → /select-mode (ilk defa gelen kullanıcı için)
 * - defaultMode HUB/SOCIAL → o app'e absolute URL ile redirect
 */
export default async function PostSignInPage() {
  const session = await auth();
  if (!session?.user) redirect('/signin');

  const defaultMode = (session.user as { defaultMode?: 'HUB' | 'SOCIAL' | null }).defaultMode;
  if (!defaultMode) redirect('/select-mode');

  redirect(defaultMode === 'HUB' ? HUB_URL : SOCIAL_URL);
}
