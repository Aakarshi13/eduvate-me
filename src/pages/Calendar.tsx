import { Layout } from '@/components/layout/Layout';
import { CalendarView } from '@/components/calendar/CalendarView';
import { exams } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

export default function CalendarPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Badge variant="outline" className="mb-2">
            <Calendar className="w-3 h-3 mr-1" />
            Admission Calendar
          </Badge>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Exam & Counselling Calendar</h1>
          <p className="text-muted-foreground mt-2">
            Stay updated with exam dates, results, and counselling schedules for 2025
          </p>
        </div>

        {/* Calendar View */}
        <CalendarView exams={exams} />
      </div>
    </Layout>
  );
}
