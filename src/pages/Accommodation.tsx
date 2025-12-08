import { Layout } from '@/components/layout/Layout';
import { HostelFinder } from '@/components/accommodation/HostelFinder';
import { Badge } from '@/components/ui/badge';
import { Building2 } from 'lucide-react';

export default function Accommodation() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
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
    </Layout>
  );
}
