import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Sparkles } from 'lucide-react';

interface ScoreInputProps {
  examType: string;
  onPredict: (data: PredictionInput) => void;
}

export interface PredictionInput {
  examType: string;
  scoreType: 'rank' | 'percentile' | 'marks';
  score: number;
  category: string;
}

export function ScoreInput({ examType, onPredict }: ScoreInputProps) {
  const [scoreType, setScoreType] = useState<'rank' | 'percentile' | 'marks'>('rank');
  const [score, setScore] = useState('');
  const [category, setCategory] = useState('general');

  const getPlaceholder = () => {
    switch (scoreType) {
      case 'rank': return 'Enter your rank (e.g., 5000)';
      case 'percentile': return 'Enter percentile (e.g., 95.5)';
      case 'marks': return 'Enter marks (e.g., 250)';
    }
  };

  const getLabel = () => {
    switch (scoreType) {
      case 'rank': return 'Your Rank';
      case 'percentile': return 'Your Percentile';
      case 'marks': return 'Your Marks';
    }
  };

  const handlePredict = () => {
    if (!score) return;
    onPredict({
      examType,
      scoreType,
      score: parseFloat(score),
      category,
    });
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Score Type</Label>
          <Select value={scoreType} onValueChange={(v) => setScoreType(v as 'rank' | 'percentile' | 'marks')}>
            <SelectTrigger className="h-12 bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rank">Rank</SelectItem>
              <SelectItem value="percentile">Percentile</SelectItem>
              <SelectItem value="marks">Marks</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">{getLabel()}</Label>
          <Input
            type="number"
            placeholder={getPlaceholder()}
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="h-12 bg-card"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-12 bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="obc">OBC</SelectItem>
              <SelectItem value="sc">SC</SelectItem>
              <SelectItem value="st">ST</SelectItem>
              <SelectItem value="ews">EWS</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        variant="hero" 
        size="xl" 
        className="w-full"
        onClick={handlePredict}
        disabled={!score}
      >
        <Sparkles className="w-5 h-5" />
        Predict My Colleges
        <Search className="w-5 h-5" />
      </Button>
    </div>
  );
}
