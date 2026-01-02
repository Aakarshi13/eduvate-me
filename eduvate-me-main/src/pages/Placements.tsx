import { Layout } from '@/components/layout/Layout';
import { PlacementCharts } from '@/components/placements/PlacementCharts';
import { Badge } from '@/components/ui/badge';
import { BarChart3 } from 'lucide-react';

export default function Placements() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 relative">
        {/* Light Mode Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none dark:hidden z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl animate-float delay-2s" />
          <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-yellow-200/25 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        {/* Dark Mode Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none hidden dark:block z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/30 rounded-full blur-3xl animate-float-rotate" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl animate-float delay-2s" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        <div className="relative z-10">
        {/* Header */}
        <div className="mb-8">
          <Badge variant="outline" className="mb-2">
            <BarChart3 className="w-3 h-3 mr-1" />
            Placement Insights
          </Badge>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Placement Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Explore placement trends, packages, and top recruiters across engineering colleges
          </p>
        </div>

        {/* Charts */}
        <PlacementCharts />
        </div>
      </div>
    </Layout>
  );
}
