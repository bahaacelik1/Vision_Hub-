import { SocialShell } from '../_components/shell';
import { requireSocialUser } from '../_guard';
import { MessagesClient } from './_client';

export default async function MessagesPage() {
  const user = await requireSocialUser();
  return (
    <SocialShell>
      <div className="h-[calc(100vh)] flex">
        <MessagesClient meName={user.name} />
      </div>
    </SocialShell>
  );
}
