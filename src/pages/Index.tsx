import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ExamSelector } from '@/components/predictor/ExamSelector';
import { ScoreInput, PredictionInput } from '@/components/predictor/ScoreInput';
import { CollegeResults } from '@/components/predictor/CollegeResults';
import { colleges, College, getLatestCutoff } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, TrendingUp, Users, Award, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function Index() {
  const [selectedExam, setSelectedExam] = useState('jee');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<{ safe: College[]; likely: College[]; competitive: College[] }>({
    safe: [],
    likely: [],
    competitive: [],
  });
  const [compareList, setCompareList] = useState<College[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePredict = (input: PredictionInput) => {
    // Mock prediction logic based on rank
    let rank = input.score;
    
    // Convert percentile/marks to approximate rank
    if (input.scoreType === 'percentile') {
      rank = Math.round((100 - input.score) * 10000 / 100);
    } else if (input.scoreType === 'marks') {
      rank = Math.round((300 - input.score) * 50);
    }

    // Category adjustment
    const categoryMultiplier = {
      general: 1,
      obc: 1.5,
      sc: 3,
      st: 2.5,
      ews: 1.2,
    };

    const adjustedRank = rank / (categoryMultiplier[input.category as keyof typeof categoryMultiplier] || 1);

    const safe: College[] = [];
    const likely: College[] = [];
    const competitive: College[] = [];

    colleges.forEach((college) => {
      const latestCutoff = getLatestCutoff(college.cutoffs.jee);
      const cutoff = latestCutoff?.general || 10000;
      
      if (adjustedRank <= cutoff * 0.6) {
        safe.push(college);
      } else if (adjustedRank <= cutoff * 1.0) {
        likely.push(college);
      } else if (adjustedRank <= cutoff * 1.5) {
        competitive.push(college);
      }
    });

    setResults({ safe, likely, competitive });
    setShowResults(true);
  };

  const handleAddToCompare = (college: College) => {
    if (compareList.find((c) => c.id === college.id)) {
      toast({
        title: "Already added",
        description: `${college.shortName} is already in your compare list`,
      });
      return;
    }
    if (compareList.length >= 4) {
      toast({
        title: "Maximum reached",
        description: "You can compare up to 4 colleges at a time",
        variant: "destructive",
      });
      return;
    }
    setCompareList([...compareList, college]);
    toast({
      title: "Added to compare",
      description: `${college.shortName} added to comparison`,
    });
  };

  const stats = [
    { icon: GraduationCap, value: '500+', label: 'Colleges' },
    { icon: Users, value: '10L+', label: 'Students Helped' },
    { icon: TrendingUp, value: '95%', label: 'Accuracy' },
    { icon: Award, value: '50+', label: 'Exams Covered' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        {/* Light Mode Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none dark:hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl animate-float delay-2s" />
          <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-cyan-200/25 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        {/* Dark Mode Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden dark:block">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float-rotate" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float delay-2s" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-up">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm">
              🎓 Trusted by 10 Lakh+ Students
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect
              <span className="text-gradient"> College Match</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter your exam scores and get instant predictions for Safe, Likely, and Competitive colleges. 
              Make informed admission decisions with real cutoff data.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fade-up delay-200">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={stat.label}
                  className="glass rounded-2xl p-4 text-center hover:shadow-glow transition-shadow"
                >
                  <Icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="font-display text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Predictor Card */}
          <div className="glass rounded-3xl p-6 md:p-8 shadow-xl animate-fade-up delay-300">
            <h2 className="font-display text-xl font-semibold mb-6">Select Your Exam</h2>
            <ExamSelector selected={selectedExam} onSelect={setSelectedExam} />
            
            <div className="mt-8">
              <h2 className="font-display text-xl font-semibold mb-6">Enter Your Score</h2>
              <ScoreInput examType={selectedExam} onPredict={handlePredict} />
            </div>
          </div>

          {/* Compare Bar */}
          {compareList.length > 0 && (
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 glass rounded-full px-6 py-3 shadow-xl flex items-center gap-4 z-50 animate-fade-up">
              <span className="text-sm font-medium">{compareList.length} colleges selected</span>
              <Button size="sm" onClick={() => navigate('/compare', { state: { colleges: compareList } })}>
                Compare Now
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      {showResults && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-3xl font-bold mb-2">Your College Predictions</h2>
                <p className="text-muted-foreground">
                  Based on your score and category, here are your college matches
                </p>
              </div>
              <Button variant="outline" onClick={() => setShowResults(false)}>
                Modify Search
              </Button>
            </div>
            <CollegeResults results={results} onAddToCompare={handleAddToCompare} />
          </div>
        </section>
      )}

      {/* Features Section */}
      {!showResults && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-center mb-12">
              Everything You Need for Admissions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'College Comparison',
                  description: 'Compare colleges side-by-side on fees, placements, facilities, and ROI',
                  icon: '📊',
                  href: '/compare',
                },
                {
                  title: 'Admission Calendar',
                  description: 'Track exam dates, results, and counselling schedules in one place',
                  icon: '📅',
                  href: '/calendar',
                },
                {
                  title: 'Placement Insights',
                  description: 'Explore packages, top recruiters, and placement trends',
                  icon: '💼',
                  href: '/placements',
                },
                {
                  title: 'PG/Hostel Finder',
                  description: 'Find affordable accommodations near your dream college',
                  icon: '🏠',
                  href: '/accommodation',
                },
                {
                  title: 'Scholarship Finder',
                  description: 'Discover scholarships you qualify for and their deadlines',
                  icon: '🎯',
                  href: '/scholarships',
                },
                {
                  title: 'Fee Analyzer',
                  description: 'Calculate total costs and plan your education budget',
                  icon: '💰',
                  href: '/scholarships',
                },
              ].map((feature) => (
                <button
                  key={feature.title}
                  onClick={() => navigate(feature.href)}
                  className="glass rounded-2xl p-6 text-left hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
                >
                  <span className="text-4xl mb-4 block">{feature.icon}</span>
                  <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
