import { College } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Star, IndianRupee, TrendingUp, Award, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompareTableProps {
  colleges: College[];
  onRemove: (id: string) => void;
}

export function CompareTable({ colleges, onRemove }: CompareTableProps) {
  if (colleges.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
          <Star className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="font-display text-xl font-semibold mb-2">No colleges to compare</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Use the predictor to find colleges and add them here for side-by-side comparison
        </p>
      </div>
    );
  }

  const rows = [
    { 
      label: 'Location', 
      icon: MapPin,
      getValue: (c: College) => `${c.location}, ${c.state}` 
    },
    { 
      label: 'Type', 
      icon: Award,
      getValue: (c: College) => c.type 
    },
    { 
      label: 'NIRF Ranking', 
      icon: Star,
      getValue: (c: College) => `#${c.ranking}`,
      highlight: true
    },
    { 
      label: 'Annual Fees', 
      icon: IndianRupee,
      getValue: (c: College) => `₹${(c.fees / 100000).toFixed(1)} L` 
    },
    { 
      label: 'Avg Package', 
      icon: TrendingUp,
      getValue: (c: College) => `₹${(c.avgPackage / 100000).toFixed(1)} LPA`,
      highlight: true
    },
    { 
      label: 'Highest Package', 
      icon: TrendingUp,
      getValue: (c: College) => `₹${(c.highestPackage / 100000).toFixed(0)} LPA` 
    },
    { 
      label: 'Placement Rate', 
      icon: TrendingUp,
      getValue: (c: College) => `${c.placementRate}%`,
      highlight: true
    },
    { 
      label: 'Established', 
      icon: Award,
      getValue: (c: College) => c.established.toString() 
    },
    { 
      label: 'Accreditation', 
      icon: Award,
      getValue: (c: College) => c.accreditation 
    },
  ];

  const getBestValue = (getValue: (c: College) => string, colleges: College[], isHigherBetter = true) => {
    const values = colleges.map((c) => {
      const val = getValue(c);
      const num = parseFloat(val.replace(/[^\d.]/g, ''));
      return { id: c.id, value: isNaN(num) ? 0 : num };
    });
    
    if (isHigherBetter) {
      return values.reduce((a, b) => (a.value > b.value ? a : b)).id;
    }
    return values.reduce((a, b) => (a.value < b.value && a.value > 0 ? a : b)).id;
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
        {/* Header */}
        <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${colleges.length}, 1fr)` }}>
          <div className="p-4 font-semibold text-muted-foreground">Compare</div>
          {colleges.map((college) => (
            <div key={college.id} className="relative p-4 bg-card rounded-t-xl border border-b-0">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6"
                onClick={() => onRemove(college.id)}
              >
                <X className="w-4 h-4" />
              </Button>
              <Badge variant="outline" className="mb-2">{college.type}</Badge>
              <h3 className="font-display font-semibold text-sm pr-6">{college.shortName}</h3>
            </div>
          ))}
        </div>

        {/* Rows */}
        {rows.map((row, index) => {
          const Icon = row.icon;
          const bestId = row.highlight 
            ? getBestValue(row.getValue, colleges, row.label !== 'Annual Fees' && row.label !== 'NIRF Ranking')
            : null;

          return (
            <div 
              key={row.label}
              className={cn(
                "grid gap-4 items-center",
                index % 2 === 0 ? "bg-muted/30" : "bg-transparent"
              )}
              style={{ gridTemplateColumns: `200px repeat(${colleges.length}, 1fr)` }}
            >
              <div className="p-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Icon className="w-4 h-4" />
                {row.label}
              </div>
              {colleges.map((college) => (
                <div 
                  key={college.id} 
                  className={cn(
                    "p-4 text-sm font-medium border-x border-border/50",
                    bestId === college.id && "text-primary font-bold"
                  )}
                >
                  {row.getValue(college)}
                  {bestId === college.id && (
                    <Badge variant="outline" className="ml-2 text-xs bg-primary/10 text-primary border-primary/30">
                      Best
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          );
        })}

        {/* Top Recruiters */}
        <div 
          className="grid gap-4"
          style={{ gridTemplateColumns: `200px repeat(${colleges.length}, 1fr)` }}
        >
          <div className="p-4 text-sm font-medium text-muted-foreground">Top Recruiters</div>
          {colleges.map((college) => (
            <div key={college.id} className="p-4 border-x border-b border-border/50 rounded-b-xl bg-card">
              <div className="flex flex-wrap gap-1">
                {college.topRecruiters.slice(0, 4).map((recruiter) => (
                  <Badge key={recruiter} variant="secondary" className="text-xs">
                    {recruiter}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
