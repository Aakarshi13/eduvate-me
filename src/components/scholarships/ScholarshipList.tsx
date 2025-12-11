import { useState } from 'react';
import { scholarships, Scholarship } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, IndianRupee, Search, ExternalLink, Award, Clock } from 'lucide-react';
import { format, parseISO, isFuture } from 'date-fns';
import { cn } from '@/lib/utils';

export function ScholarshipList() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [examType, setExamType] = useState<string>('all');

  const filteredScholarships = scholarships.filter((s) => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && 
        !s.provider.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (category !== 'all' && s.category !== category) return false;
    if (examType !== 'all' && !s.examType.includes(examType)) return false;
    return true;
  });

  const categoryConfig = {
    merit: { label: 'Merit Based', color: 'bg-primary/10 text-primary border-primary/30' },
    need: { label: 'Need Based', color: 'bg-safe/10 text-safe border-safe/30' },
    category: { label: 'Category Based', color: 'bg-likely/10 text-likely border-likely/30' },
    sports: { label: 'Sports', color: 'bg-competitive/10 text-competitive border-competitive/30' },
  };

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="gradient-card border-2">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <Award className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Scholarships</p>
              <p className="text-2xl font-display font-bold">{scholarships.length}+</p>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-2">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
              <IndianRupee className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Max Amount</p>
              <p className="text-2xl font-display font-bold">₹80,000</p>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-2">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-likely flex items-center justify-center">
              <Clock className="w-6 h-6 text-likely-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Open Now</p>
              <p className="text-2xl font-display font-bold">
                {scholarships.filter(s => isFuture(parseISO(s.deadline))).length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-2">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search scholarships..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="merit">Merit Based</SelectItem>
                <SelectItem value="need">Need Based</SelectItem>
                <SelectItem value="category">Category Based</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
              </SelectContent>
            </Select>

            <Select value={examType} onValueChange={setExamType}>
              <SelectTrigger>
                <SelectValue placeholder="Exam Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Exams</SelectItem>
                <SelectItem value="jee">JEE</SelectItem>
                <SelectItem value="neet">NEET</SelectItem>
                <SelectItem value="cuet">CUET</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Scholarship List */}
      <div className="space-y-4">
        {filteredScholarships.map((scholarship, index) => {
          const catConfig = categoryConfig[scholarship.category];
          const isOpen = isFuture(parseISO(scholarship.deadline));

          return (
            <Card 
              key={scholarship.id}
              className={cn(
                "overflow-hidden border-2 hover:shadow-lg transition-all duration-300 animate-fade-up",
                !isOpen && "opacity-60"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge variant="outline" className={catConfig.color}>
                        {catConfig.label}
                      </Badge>
                      {scholarship.exam_types?.map((exam: string) => (
                        <Badge key={exam} variant="secondary" className="text-xs uppercase">
                          {exam}
                        </Badge>
                      ))}
                      {isOpen ? (
                        <Badge className="bg-safe text-safe-foreground">Open</Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">Closed</Badge>
                      )}
                    </div>
                    <h3 className="font-display text-lg font-bold">{scholarship.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{scholarship.provider}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 lg:gap-8">
                    <div className="text-center sm:text-left">
                      <p className="text-xs text-muted-foreground">Amount</p>
                      <p className="font-display font-bold text-xl text-primary">
                        ₹{scholarship.amount.toLocaleString()}
                      </p>
                    </div>

                    <div className="text-center sm:text-left">
                      <p className="text-xs text-muted-foreground flex items-center gap-1 justify-center sm:justify-start">
                        <Calendar className="w-3 h-3" />
                        Deadline
                      </p>
                      <p className="font-semibold">
                        {format(parseISO(scholarship.deadline), 'MMM d, yyyy')}
                      </p>
                    </div>

                    <Button variant={isOpen ? "hero" : "outline"} className="shrink-0" disabled={!isOpen}>
                      {isOpen ? 'Apply Now' : 'Closed'}
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Eligibility:</span> {scholarship.eligibility}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredScholarships.length === 0 && (
        <div className="text-center py-16">
          <Award className="w-16 h-16 mx-auto text-muted-foreground/40 mb-4" />
          <h3 className="font-display text-xl font-semibold mb-2">No scholarships found</h3>
          <p className="text-muted-foreground">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
