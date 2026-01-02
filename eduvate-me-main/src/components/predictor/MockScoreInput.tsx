import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Sparkles, FileText } from 'lucide-react';

interface MockScoreInputProps {
  examType: string;
  onPredict: (data: MockPredictionInput) => void;
}

export interface MockPredictionInput {
  examType: string;
  mockScore: number;
  maxScore: number;
  category: string;
}

export function MockScoreInput({ examType, onPredict }: MockScoreInputProps) {
  const [mockScore, setMockScore] = useState('');
  const [maxScore, setMaxScore] = useState('');
  const [category, setCategory] = useState('general');

  const getPlaceholder = () => {
    switch (examType) {
      case 'jee-main':
      case 'jee-adv':
        return 'Enter your mock test score (e.g., 180)';
      case 'neet':
        return 'Enter your mock test score (e.g., 520)';
      case 'cuet':
        return 'Enter your mock test score (e.g., 280)';
      default:
        return 'Enter your mock test score';
    }
  };

  const getMaxScorePlaceholder = () => {
    switch (examType) {
      case 'jee-main':
      case 'jee-adv':
        return '300';
      case 'neet':
        return '720';
      case 'cuet':
        return '400';
      default:
        return 'Enter maximum possible score';
    }
  };

  const getDefaultMaxScore = () => {
    switch (examType) {
      case 'jee-main':
      case 'jee-adv':
        return '300';
      case 'neet':
        return '720';
      case 'cuet':
        return '400';
      default:
        return '';
    }
  };

  const handlePredict = () => {
    if (!mockScore || !maxScore) return;
    onPredict({
      examType,
      mockScore: parseFloat(mockScore),
      maxScore: parseFloat(maxScore),
      category,
    });
  };

  // Set default max score when component mounts or examType changes
  useEffect(() => {
    setMaxScore(getDefaultMaxScore());
  }, [examType]);

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Mock Test Score</Label>
          <Input
            type="number"
            placeholder={getPlaceholder()}
            value={mockScore}
            onChange={(e) => setMockScore(e.target.value)}
            className="h-12 bg-card"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Maximum Score</Label>
          <Input
            type="number"
            placeholder={getMaxScorePlaceholder()}
            value={maxScore || getDefaultMaxScore()}
            onChange={(e) => setMaxScore(e.target.value)}
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
        disabled={!mockScore || !maxScore}
      >
        <FileText className="w-5 h-5" />
        Predict Colleges from Mock Score
        <Search className="w-5 h-5" />
      </Button>
    </div>
  );
}