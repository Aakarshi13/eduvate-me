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
      <div className="container mx-auto px-4 py-12">
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
    </Layout>
  );
}
