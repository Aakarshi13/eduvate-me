import { Layout } from '@/components/layout/Layout';
import { CalendarView } from '@/components/calendar/CalendarView';
import { exams } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

export default function CalendarPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 relative">
        {/* Light Mode Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none dark:hidden z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl animate-float delay-2s" />
          <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-cyan-200/25 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        {/* Dark Mode Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none hidden dark:block z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl animate-float-rotate" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-float delay-2s" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        <div className="relative z-10">
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
      </div>
    </Layout>
  );
}
