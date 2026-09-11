import { redirect } from 'next/navigation';
import { auth } from '@vision/auth';
import { UserMenu } from '@vision/ui';
import { SocialShell } from './_components/shell';
import { StoryBar } from './_components/story-bar';
import { Compose } from './_components/compose';
import { PostCard } from './_components/post-card';
import { RightRail } from './_components/right-rail';
import { feed } from './_data/feed';

const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL ?? 'http://localhost:3000';

export default async function SocialFeedPage() {
  const session = await auth();
  if (!session?.user) {
    redirect(`${GATEWAY_URL}/signin`);
  }
  const defaultMode = (session.user as { defaultMode?: 'HUB' | 'SOCIAL' | null }).defaultMode;
  if (!defaultMode) {
    redirect(`${GATEWAY_URL}/select-mode`);
  }

  const userName = session.user.name ?? session.user.email ?? 'Öğrenci';
  return (
    <SocialShell>
      <div className="mx-auto max-w-[1200px] flex gap-8 px-6">
        {/* Feed column */}
        <div className="flex-1 max-w-[600px] mx-auto py-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-[22px] font-semibold">Ana Sayfa</h1>
            <UserMenu name={userName} email={session.user.email ?? undefined} />
          </div>

          <StoryBar currentName={userName} />
          <Compose userName={userName} />

          <div className="space-y-4">
            {feed.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>

          <p className="text-center text-[12px] text-fg-muted py-6">
            Tüm gönderileri gördün. Yeni bir şey paylaşmak ister misin? ✨
          </p>
        </div>

        {/* Right rail */}
        <RightRail userName={userName} city="İstanbul" />
      </div>
    </SocialShell>
  );
}
