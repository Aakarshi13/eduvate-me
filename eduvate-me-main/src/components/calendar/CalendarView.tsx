import { Exam } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, FileText, Users } from 'lucide-react';
import { format, parseISO, isFuture, isPast } from 'date-fns';
import { cn } from '@/lib/utils';

interface CalendarViewProps {
  exams: Exam[];
}

export function CalendarView({ exams }: CalendarViewProps) {
  const sortedExams = [...exams].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const getExamStatus = (exam: Exam) => {
    const examDate = parseISO(exam.date);
    const resultDate = parseISO(exam.resultDate);
    const today = new Date();

    if (isPast(resultDate)) return { status: 'completed', label: 'Completed' };
    if (isPast(examDate)) return { status: 'awaiting', label: 'Awaiting Results' };
    if (isFuture(examDate)) return { status: 'upcoming', label: 'Upcoming' };
    return { status: 'today', label: 'Today' };
  };

  const statusConfig = {
    completed: { bg: 'bg-muted', border: 'border-muted', text: 'text-muted-foreground' },
    awaiting: { bg: 'bg-likely/10', border: 'border-likely/30', text: 'text-likely' },
    upcoming: { bg: 'bg-primary/10', border: 'border-primary/30', text: 'text-primary' },
    today: { bg: 'bg-safe/10', border: 'border-safe/30', text: 'text-safe' },
  };

  const typeConfig = {
    engineering: { label: 'Engineering', color: 'bg-primary text-primary-foreground' },
    medical: { label: 'Medical', color: 'bg-safe text-safe-foreground' },
    general: { label: 'General', color: 'bg-likely text-likely-foreground' },
  };

  return (
    <div className="space-y-4">
      {sortedExams.map((exam, index) => {
        const { status, label } = getExamStatus(exam);
        const config = statusConfig[status as keyof typeof statusConfig];
        const typeConf = typeConfig[exam.type];

        return (
          <Card 
            key={exam.id}
            className={cn(
              "overflow-hidden transition-all duration-300 hover:shadow-lg border-2 animate-fade-up",
              config.border, config.bg
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge className={typeConf.color}>{typeConf.label}</Badge>
                    <Badge variant="outline" className={config.text}>{label}</Badge>
                  </div>
                  <h3 className="font-display text-xl font-bold mb-1">{exam.name}</h3>
                  <p className="text-muted-foreground text-sm">{exam.fullName}</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Exam Date
                    </p>
                    <p className="font-semibold text-sm">
                      {format(parseISO(exam.date), 'MMM d, yyyy')}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      Results
                    </p>
                    <p className="font-semibold text-sm">
                      {format(parseISO(exam.resultDate), 'MMM d, yyyy')}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Counselling
                    </p>
                    <p className="font-semibold text-sm">
                      {format(parseISO(exam.counsellingStart), 'MMM d')} - {format(parseISO(exam.counsellingEnd), 'MMM d')}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Registration
                    </p>
                    <p className="font-semibold text-sm">
                      Till {format(parseISO(exam.registrationDeadline), 'MMM d')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
