import { College } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MapPin, TrendingUp, IndianRupee, Users, ExternalLink, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollegeResultsProps {
  results: {
    safe: College[];
    likely: College[];
    competitive: College[];
  };
  onAddToCompare: (college: College) => void;
}

interface CollegeCardProps {
  college: College;
  category: 'safe' | 'likely' | 'competitive';
  index: number;
  onAddToCompare: (college: College) => void;
}

function CollegeCard({ college, category, index, onAddToCompare }: CollegeCardProps) {
  const categoryConfig = {
    safe: { label: 'Safe', variant: 'safe' as const, bg: 'bg-safe/10 border-safe/30' },
    likely: { label: 'Likely', variant: 'likely' as const, bg: 'bg-likely/10 border-likely/30' },
    competitive: { label: 'Competitive', variant: 'competitive' as const, bg: 'bg-competitive/10 border-competitive/30' },
  };

  const config = categoryConfig[category];

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.01] animate-fade-up border-2",
        config.bg
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-xs font-medium">
                #{college.ranking} Rank
              </Badge>
              <Badge className={cn("text-xs", `bg-${category} text-${category}-foreground`)}>
                {config.label}
              </Badge>
            </div>
            <h3 className="font-display font-semibold text-lg truncate">{college.name}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" />
              {college.location}, {college.state}
            </p>
          </div>
          <Badge variant="outline" className="shrink-0">
            {college.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-background/50">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <IndianRupee className="w-3 h-3" />
              Avg Package
            </p>
            <p className="font-semibold text-foreground">
              ₹{(college.avgPackage / 100000).toFixed(1)} LPA
            </p>
          </div>
          <div className="p-3 rounded-lg bg-background/50">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Placement
            </p>
            <p className="font-semibold text-foreground">{college.placementRate}%</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span className="truncate">
            Top recruiters: {college.topRecruiters.slice(0, 3).join(', ')}
          </span>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onAddToCompare(college)}>
            <Plus className="w-4 h-4" />
            Compare
          </Button>
          <Button variant="ghost" size="sm">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function CollegeResults({ results, onAddToCompare }: CollegeResultsProps) {
  const sections = [
    { key: 'safe' as const, title: '🎯 Safe Colleges', subtitle: 'High chance of admission' },
    { key: 'likely' as const, title: '⚡ Likely Colleges', subtitle: 'Good chance of admission' },
    { key: 'competitive' as const, title: '🔥 Competitive Colleges', subtitle: 'Worth trying' },
  ];

  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <div key={section.key} className="space-y-4">
          <div className="flex items-baseline gap-3">
            <h2 className="font-display text-2xl font-bold">{section.title}</h2>
            <span className="text-muted-foreground text-sm">({results[section.key].length} colleges)</span>
          </div>
          <p className="text-muted-foreground">{section.subtitle}</p>
          
          {results[section.key].length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results[section.key].map((college, index) => (
                <CollegeCard 
                  key={college.id} 
                  college={college} 
                  category={section.key}
                  index={index}
                  onAddToCompare={onAddToCompare}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-muted/30 rounded-xl">
              <p className="text-muted-foreground">No colleges found in this category for your score</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
