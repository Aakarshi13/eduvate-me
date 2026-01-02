import { useState } from 'react';
import { College } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Search, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollegeSelectorProps {
  colleges: College[];
  loading: boolean;
  onSelect: (college: College) => void;
  selectedCollege: College | null;
}

export function CollegeSelector({ colleges, loading, onSelect, selectedCollege }: CollegeSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredColleges = colleges.filter(college => 
    college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-3">Loading colleges...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search colleges by name, location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12"
        />
      </div>

      {/* College List */}
      <div className="max-h-96 overflow-y-auto pr-2">
        {filteredColleges.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No colleges found matching your search
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredColleges.map((college) => (
              <Card
                key={college.id}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  selectedCollege?.id === college.id 
                    ? "ring-2 ring-primary border-primary" 
                    : "border-border"
                )}
                onClick={() => onSelect(college)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{college.shortName}</h3>
                      <p className="text-sm text-muted-foreground truncate">{college.location}, {college.state}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-1 bg-secondary rounded">
                          {college.type}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Rank #{college.ranking}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}