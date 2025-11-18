import type { Metadata } from 'next';
import { Sora, Playfair_Display } from 'next/font/google';
import './globals.css';

const sora = Sora({ subsets: ['latin'] });
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
});



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
        {children}
      </body>
    </html>
  );
}