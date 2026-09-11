'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button, FormField, Input, Icon } from '@vision/ui';

type Tab = 'signin' | 'signup';

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInContent />
    </Suspense>
  );
}

function SignInContent() {
  const params = useSearchParams();
  const [tab, setTab] = useState<Tab>(params.get('tab') === 'signup' ? 'signup' : 'signin');

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 bg-canvas text-fg">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-hub-500 to-social-500 flex items-center justify-center text-white font-bold">
            V
          </div>
          <span className="font-semibold tracking-tight text-lg">Vision</span>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-8 shadow-md">
          <div className="flex bg-subtle rounded-full p-1 mb-6">
            <TabButton active={tab === 'signin'} onClick={() => setTab('signin')}>
              Giriş yap
            </TabButton>
            <TabButton active={tab === 'signup'} onClick={() => setTab('signup')}>
              Hesap oluştur
            </TabButton>
          </div>

          {tab === 'signin' ? <SignInForm /> : <SignUpForm onSwitch={() => setTab('signin')} />}
        </div>

        <p className="mt-6 text-center text-sm text-fg-muted">
          {tab === 'signin' ? (
            <>
              Hesabın yok mu?{' '}
              <button onClick={() => setTab('signup')} className="text-link font-medium">
                Oluştur
              </button>
            </>
          ) : (
            <>
              Zaten hesabın var mı?{' '}
              <button onClick={() => setTab('signin')} className="text-link font-medium">
                Giriş yap
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 h-9 rounded-full text-sm font-medium transition-colors ${
        active ? 'bg-surface text-fg shadow-sm' : 'text-fg-muted'
      }`}
    >
      {children}
    </button>
  );
}

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const valid = /^\S+@\S+\.\S+$/.test(email) && password.length >= 6;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn('credentials', {
      email: email.trim().toLowerCase(),
      password,
      redirect: false,
    });
    setLoading(false);
    if (!res || res.error) {
      setError('E-posta veya şifre hatalı.');
      return;
    }
    window.location.href = '/post-signin';
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField label="E-posta" htmlFor="email">
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ornek@universite.edu.tr"
          leading={<Icon.Mail />}
          autoComplete="email"
          required
        />
      </FormField>

      <FormField label="Şifre" htmlFor="password" error={error ?? undefined}>
        <Input
          id="password"
          type={show ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="En az 6 karakter"
          invalid={!!error}
          trailing={
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="text-fg-muted hover:text-fg"
              aria-label={show ? 'Şifreyi gizle' : 'Şifreyi göster'}
            >
              {show ? <Icon.EyeOff /> : <Icon.Eye />}
            </button>
          }
          autoComplete="current-password"
          required
        />
      </FormField>

      <div className="flex justify-end">
        <Link href="/forgot-password" className="text-[13px] text-link">
          Şifreni mi unuttun?
        </Link>
      </div>

      <Button type="submit" fullWidth size="lg" loading={loading} disabled={!valid}>
        Giriş Yap
      </Button>
    </form>
  );
}

function SignUpForm({ onSwitch }: { onSwitch: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordStrength = Math.min(
    4,
    (password.length >= 8 ? 1 : 0) +
      (/[A-Z]/.test(password) ? 1 : 0) +
      (/[0-9]/.test(password) ? 1 : 0) +
      (/[^A-Za-z0-9]/.test(password) ? 1 : 0),
  );

  const valid =
    name.trim().length >= 2 &&
    /^\S+@\S+\.\S+$/.test(email) &&
    password.length >= 8 &&
    password === confirm &&
    agreed;

  const strengthLabels = ['Zayıf', 'Zayıf', 'Orta', 'İyi', 'Güçlü'];
  const strengthColors = ['#EF4444', '#EF4444', '#EAB308', '#22C55E', '#22C55E'];

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), password }),
    });
    if (!res.ok) {
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      setError(j.error ?? 'Kayıt başarısız.');
      setLoading(false);
      return;
    }
    // Auto sign-in — yeni kullanıcının defaultMode'u yok, post-signin select-mode'a gönderecek
    const s = await signIn('credentials', {
      email: email.trim().toLowerCase(),
      password,
      redirect: false,
    });
    setLoading(false);
    if (!s || s.error) {
      onSwitch();
      return;
    }
    window.location.href = '/post-signin';
  };

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <FormField label="Ad Soyad" htmlFor="name">
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Baha Çelik" />
      </FormField>
      <FormField label="E-posta" htmlFor="email" error={error ?? undefined}>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ornek@universite.edu.tr"
          leading={<Icon.Mail />}
          invalid={!!error}
        />
      </FormField>
      <FormField
        label="Şifre"
        htmlFor="password"
        hint={password ? `Güç: ${strengthLabels[passwordStrength]}` : 'En az 8 karakter, büyük harf ve rakam öneririz.'}
      >
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
        {password && (
          <div className="mt-2 flex gap-1">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="h-1 flex-1 rounded-full"
                style={{
                  background: i < passwordStrength ? strengthColors[passwordStrength] : 'var(--color-border-default)',
                }}
              />
            ))}
          </div>
        )}
      </FormField>
      <FormField
        label="Şifre (tekrar)"
        htmlFor="confirm"
        error={confirm && confirm !== password ? 'Şifreler eşleşmiyor' : undefined}
      >
        <Input
          id="confirm"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          invalid={!!confirm && confirm !== password}
        />
      </FormField>

      <label className="flex items-start gap-2 text-[13px] text-fg-muted cursor-pointer">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-[color:var(--color-action-primary)]"
        />
        <span>
          <span className="text-link font-medium">Kullanım Koşulları</span> ve{' '}
          <span className="text-link font-medium">Gizlilik Politikası</span>'nı okudum, kabul ediyorum.
        </span>
      </label>

      <Button type="submit" fullWidth size="lg" loading={loading} disabled={!valid}>
        Hesap Oluştur
      </Button>
    </form>
  );
}
