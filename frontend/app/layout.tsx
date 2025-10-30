import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Royal Biryani House — Catering',
  description: 'Authentic Indian Cuisine for Every Occasion | Royal Biryani House Catering',
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
      <body className={`${inter.className} ${playfair.className} bg-cream text-dark`}>
        <main>{children}</main>
      </body>
    </html>
  );
}