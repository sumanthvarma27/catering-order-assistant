import type { Metadata } from 'next';
import { Sora, Playfair_Display } from 'next/font/google';
import Link from 'next/link'; // ✅ Add this import
import './globals.css';

const sora = Sora({ subsets: ['latin'] });
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Royal Biryani House — Catering',
  description: 'AI-powered Catering Management | Royal Biryani House',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${sora.className} ${playfair.className} bg-cream text-dark`}>
        <main className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-72 bg-gradient-to-b from-[#f6e8d5] to-[#e7d7c1] border-r border-brown/20 p-6 flex flex-col justify-between shadow-royal">
            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-12 rounded-full bg-gradient-royal flex items-center justify-center text-white text-2xl shadow-lg">✦</div>
                <h1 className="font-heading text-2xl text-copper">Royal Biryani</h1>
              </div>

              <nav className="space-y-3">
                <Link href="/" className="flex items-center gap-3 text-brown hover:text-copper font-medium transition-all duration-200">
                  <span>🏠</span> Home
                </Link>
                <Link href="#chat" className="flex items-center gap-3 text-brown hover:text-copper font-medium transition-all duration-200">
                  <span>💬</span> Chat Assistant
                </Link>
                <Link href="#analytics" className="flex items-center gap-3 text-brown hover:text-copper font-medium transition-all duration-200">
                  <span>📊</span> Analytics
                </Link>
                <Link href="#settings" className="flex items-center gap-3 text-brown hover:text-copper font-medium transition-all duration-200">
                  <span>⚙️</span> Settings
                </Link>
              </nav>
            </div>

            <div className="mt-10 border-t border-brown/20 pt-4">
              <p className="text-xs text-gray-500">© 2025 Royal Biryani House</p>
              <p className="text-xs text-gray-500">AI-Powered Catering Platform</p>
            </div>
          </aside>

          {/* Main Content */}
          <section className="flex-1 overflow-y-auto">{children}</section>
        </main>
      </body>
    </html>
  );
}
