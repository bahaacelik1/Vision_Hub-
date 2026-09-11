'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, FormField, Input, Icon } from '@vision/ui';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 bg-canvas text-fg">
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-md">
        <h1 className="text-[22px] font-semibold">Şifreni sıfırla</h1>
        <p className="mt-1 text-sm text-fg-muted">
          E-posta adresine bir sıfırlama bağlantısı göndereceğiz.
        </p>

        {sent ? (
          <div className="mt-6 p-4 rounded-md bg-primary-soft text-sm text-fg">
            Sıfırlama bağlantısı <b>{email}</b> adresine gönderildi.
          </div>
        ) : (
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <FormField label="E-posta" htmlFor="email">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leading={<Icon.Mail />}
                required
              />
            </FormField>
            <Button type="submit" fullWidth size="lg">
              Sıfırlama bağlantısı gönder
            </Button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link href="/signin" className="text-[13px] text-link">
            Giriş ekranına dön
          </Link>
        </div>
      </div>
    </div>
  );
}
