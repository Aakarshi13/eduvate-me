import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { CompareTable } from '@/components/compare/CompareTable';
import { colleges, College } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, BarChart3 } from 'lucide-react';

export default function Compare() {
  const location = useLocation();
  const [compareList, setCompareList] = useState<College[]>([]);

  useEffect(() => {
    if (location.state?.colleges) {
      setCompareList(location.state.colleges);
    }
  }, [location.state]);

  const handleAddCollege = (id: string) => {
    const college = colleges.find((c) => c.id === id);
    if (college && !compareList.find((c) => c.id === id) && compareList.length < 4) {
      setCompareList([...compareList, college]);
    }
  };

  const handleRemove = (id: string) => {
    setCompareList(compareList.filter((c) => c.id !== id));
  };

  const availableColleges = colleges.filter((c) => !compareList.find((comp) => comp.id === c.id));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 relative">
        {/* Light Mode Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none dark:hidden z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl animate-float delay-2s" />
          <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-cyan-200/25 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        {/* Dark Mode Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none hidden dark:block z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-float-rotate" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-float delay-2s" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <Badge variant="outline" className="mb-2">
                <BarChart3 className="w-3 h-3 mr-1" />
                Compare Tool
              </Badge>
              <h1 className="font-display text-3xl md:text-4xl font-bold">Compare Colleges</h1>
              <p className="text-muted-foreground mt-2">
                Compare up to 4 colleges side-by-side on key metrics
              </p>
            </div>

            {compareList.length < 4 && (
              <div className="flex items-center gap-2">
                <Select onValueChange={handleAddCollege}>
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Add a college..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableColleges.map((college) => (
                      <SelectItem key={college.id} value={college.id}>
                        {college.shortName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button size="icon" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Compare Table */}
          <CompareTable colleges={compareList} onRemove={handleRemove} />
        </div>
      </div>
    </Layout>
  );
}
