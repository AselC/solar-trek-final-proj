import './globals.css';
import { Inter, Orbitron } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

export const metadata = {
  title: 'Solar Trek - Sunrise & Sunset Times',
  description: 'Find global sunrise and sunset times beautifully.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="min-h-screen overflow-x-hidden font-inter bg-gradient-to-br from-peach via-soft-blue to-lavender relative">
        {/* Animated overlay (do not modify) */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-pink-500/10 to-orange-300/20 animate-pulse z-0"></div>

        {/* Floating particles (do not modify) */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* App Content */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
