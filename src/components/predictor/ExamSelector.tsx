import { cn } from '@/lib/utils';

interface ExamOption {
  id: string;
  name: string;
  fullName: string;
  icon: string;
}

const exams: ExamOption[] = [
  { id: 'jee', name: 'JEE Main', fullName: 'Joint Entrance Examination', icon: '🎯' },
  { id: 'jee-adv', name: 'JEE Advanced', fullName: 'For IITs', icon: '🏆' },
  { id: 'neet', name: 'NEET', fullName: 'Medical Entrance', icon: '🏥' },
  { id: 'cuet', name: 'CUET', fullName: 'Central Universities', icon: '🎓' },
];

interface ExamSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
}

export function ExamSelector({ selected, onSelect }: ExamSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {exams.map((exam) => (
        <button
          key={exam.id}
          onClick={() => onSelect(exam.id)}
          className={cn(
            "p-4 rounded-xl border-2 transition-all duration-200 text-left",
            "hover:scale-[1.02] hover:shadow-md",
            selected === exam.id
              ? "border-primary bg-primary/5 shadow-md"
              : "border-border bg-card hover:border-primary/50"
          )}
        >
          <span className="text-2xl mb-2 block">{exam.icon}</span>
          <p className="font-semibold text-foreground">{exam.name}</p>
          <p className="text-xs text-muted-foreground mt-1">{exam.fullName}</p>
        </button>
      ))}
    </div>
  );
}
