import Link from 'next/link';
import { Button, ThemeToggle } from '@vision/ui';

/**
 * Screen 1: Welcome
 * Full viewport. Sakin, ferah, premium his.
 */
export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas text-fg">
      <header className="h-16 px-8 flex items-center justify-between">
        <VisionLogo />
        <div className="flex items-center gap-2">
          <button className="text-sm text-fg-muted hover:text-fg h-11 px-3 rounded-md">TR</button>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <MeshBackground />

        <div className="relative z-10 max-w-2xl text-center space-y-6">
          <h1 className="text-[48px] leading-[1.1] font-bold tracking-tight">
            Öğrencilerin{' '}
            <span className="bg-gradient-to-r from-hub-500 to-social-500 bg-clip-text text-transparent">
              tanıştığı, öğrendiği, ürettiği
            </span>{' '}
            tek platform.
          </h1>
          <p className="text-lg text-fg-muted max-w-xl mx-auto">
            Akademik yolculuğun ve öğrenci hayatın için tek hesap. Vision Hub ile fırsatları
            keşfet, Vision Social ile toplulukla buluş.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-4">
            <Link href="/signin">
              <Button size="lg" className="px-8">
                Giriş Yap
              </Button>
            </Link>
            <Link href="/signin?tab=signup" className="text-sm text-fg-muted hover:text-fg">
              Hesabın yok mu? <span className="text-link font-medium">Hemen oluştur</span>
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-[12px] text-fg-muted">
        © 2026 Vision Ecosystem
      </footer>
    </div>
  );
}

function VisionLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-hub-500 to-social-500 flex items-center justify-center text-white font-bold">
        V
      </div>
      <span className="font-semibold tracking-tight text-lg">Vision</span>
    </div>
  );
}

function MeshBackground() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-hub-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-social-500/20 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-hub-200/30 blur-3xl" />
    </div>
  );
}
