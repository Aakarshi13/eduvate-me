import { Layout } from '@/components/layout/Layout';
import { ScholarshipList } from '@/components/scholarships/ScholarshipList';
import { Badge } from '@/components/ui/badge';
import { Wallet } from 'lucide-react';

export default function Scholarships() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Badge variant="outline" className="mb-2">
            <Wallet className="w-3 h-3 mr-1" />
            Scholarship Finder
          </Badge>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Scholarships & Financial Aid</h1>
          <p className="text-muted-foreground mt-2">
            Discover scholarships, fellowships, and financial aid programs you qualify for
          </p>
        </div>

        {/* Scholarship List */}
        <ScholarshipList />
      </div>
    </Layout>
  );
}
