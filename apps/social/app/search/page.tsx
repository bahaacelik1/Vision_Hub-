import { SocialShell } from '../_components/shell';
import { requireSocialUser } from '../_guard';
import { SearchClient } from './_client';

export default async function SearchPage() {
  await requireSocialUser();
  return (
    <SocialShell>
      <div className="max-w-[720px] mx-auto px-6 py-6">
        <h1 className="text-[22px] font-semibold mb-4">Arama</h1>
        <SearchClient />
      </div>
    </SocialShell>
  );
}
