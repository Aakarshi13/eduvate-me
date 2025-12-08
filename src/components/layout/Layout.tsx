import { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen gradient-hero">
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
      <footer className="border-t border-border/50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">
            © 2025 CollegePredictor. Helping students make informed admission decisions.
          </p>
        </div>
      </footer>
    </div>
  );
}
