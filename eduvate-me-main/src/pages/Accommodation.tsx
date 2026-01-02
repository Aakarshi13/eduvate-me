import { Layout } from '@/components/layout/Layout';
import { HostelFinder } from '@/components/accommodation/HostelFinder';
import { Badge } from '@/components/ui/badge';
import { Building2 } from 'lucide-react';

export default function Accommodation() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 relative">
        {/* Light Mode Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none dark:hidden z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl animate-float delay-2s" />
          <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-red-200/25 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        {/* Dark Mode Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none hidden dark:block z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-500/30 rounded-full blur-3xl animate-float-rotate" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-float delay-2s" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-red-500/20 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        <div className="relative z-10">
        {/* Header */}
        <div className="mb-8">
          <Badge variant="outline" className="mb-2">
            <Building2 className="w-3 h-3 mr-1" />
            Accommodation Finder
          </Badge>
          <h1 className="font-display text-3xl md:text-4xl font-bold">PG & Hostel Finder</h1>
          <p className="text-muted-foreground mt-2">
            Find affordable accommodations near your dream college with verified listings
          </p>
        </div>

        {/* Hostel Finder */}
        <HostelFinder />
        </div>
      </div>
    </Layout>
  );
}
