// import { ThemeProvider } from '@/components/features/blog/theme-provider';
import type { Metadata } from 'next';

import './blog.css';

export const metadata: Metadata = {
  title: 'Blog | Ownkey',
  description: 'Generated by create next app',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    // <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
    <div>{children}</div>
  );
}
