import { Layout } from '@/components/layout/Layout';
import { PlacementCharts } from '@/components/placements/PlacementCharts';
import { Badge } from '@/components/ui/badge';
import { BarChart3 } from 'lucide-react';

export default function Placements() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
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
    </Layout>
  );
}
