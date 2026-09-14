import { type ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

export function MainLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen overflow-hidden"><Header/><main>{children}</main><Footer/></div>;
}
