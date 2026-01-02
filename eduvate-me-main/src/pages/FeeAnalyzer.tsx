import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { CollegeSelector } from '@/components/fee-analyzer/CollegeSelector';
import { FeeBreakdown } from '@/components/fee-analyzer/FeeBreakdown';
import { College } from '@/data/mockData';
import { collegesAPI } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Calculator, IndianRupee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function FeeAnalyzer() {
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await collegesAPI.getAll();
        setColleges(response.colleges);
      } catch (error) {
        console.error('Failed to fetch colleges:', error);
        toast({
          title: "Error",
          description: "Failed to load colleges",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 relative">
        {/* Light Mode Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none dark:hidden z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl animate-float delay-2s" />
          <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-cyan-200/25 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        {/* Dark Mode Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none hidden dark:block z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl animate-float-rotate" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-float delay-2s" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="mb-8">
            <Badge variant="outline" className="mb-2">
              <Calculator className="w-3 h-3 mr-1" />
              Fee Analyzer
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl font-bold">Education Cost Calculator</h1>
            <p className="text-muted-foreground mt-2">
              Calculate total costs and plan your education budget for any college
            </p>
          </div>

          {/* College Selector */}
          <div className="glass rounded-2xl p-6 mb-8">
            <h2 className="font-display text-xl font-semibold mb-4">Select a College</h2>
            <CollegeSelector 
              colleges={colleges} 
              loading={loading}
              onSelect={setSelectedCollege}
              selectedCollege={selectedCollege}
            />
          </div>

          {/* Fee Breakdown */}
          {selectedCollege && (
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <IndianRupee className="w-5 h-5 text-primary" />
                <h2 className="font-display text-xl font-semibold">Fee Breakdown</h2>
              </div>
              <FeeBreakdown college={selectedCollege} />
            </div>
          )}

          {!selectedCollege && !loading && (
            <div className="text-center py-12">
              <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Select a college to see its fee breakdown</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}