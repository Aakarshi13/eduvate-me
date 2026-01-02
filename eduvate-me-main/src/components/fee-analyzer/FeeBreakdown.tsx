import { College } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee, Calendar, BookOpen, Home, Utensils, Wifi, Bus } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface FeeBreakdownProps {
  college: College;
}

export function FeeBreakdown({ college }: FeeBreakdownProps) {
  // Calculate fee components
  const tuitionFees = college.fees * 0.6; // 60% tuition
  const hostelFees = college.fees * 0.2; // 20% hostel
  const messFees = college.fees * 0.1; // 10% mess
  const miscFees = college.fees * 0.1; // 10% miscellaneous

  // Calculate 4-year total
  const fourYearTotal = college.fees * 4;

  // Get facilities for additional costs
  const hasHostel = college.facilities.includes('Hostel');
  const hasMess = college.facilities.includes('Cafeteria');
  const hasTransport = college.facilities.includes('Transport');

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IndianRupee className="w-5 h-5" />
            Annual Fee Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-center py-4">
            {formatCurrency(college.fees)}
          </div>
          <div className="text-center text-muted-foreground">
            Total annual fees for {college.shortName}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="w-4 h-4" />
              Tuition Fees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(tuitionFees)}</div>
            <div className="text-sm text-muted-foreground">60% of total fees</div>
          </CardContent>
        </Card>

        {hasHostel && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Home className="w-4 h-4" />
                Hostel Fees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(hostelFees)}</div>
              <div className="text-sm text-muted-foreground">20% of total fees</div>
            </CardContent>
          </Card>
        )}

        {hasMess && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Utensils className="w-4 h-4" />
                Mess Charges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(messFees)}</div>
              <div className="text-sm text-muted-foreground">10% of total fees</div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wifi className="w-4 h-4" />
              Miscellaneous
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(miscFees)}</div>
            <div className="text-sm text-muted-foreground">Library, labs, etc.</div>
          </CardContent>
        </Card>
      </div>

      {/* 4-Year Projection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            4-Year Cost Projection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <div className="text-sm text-muted-foreground">Annual Fees</div>
              <div className="text-xl font-bold">{formatCurrency(college.fees)}</div>
            </div>
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <div className="text-sm text-muted-foreground">4 Years Total</div>
              <div className="text-xl font-bold">{formatCurrency(fourYearTotal)}</div>
            </div>
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <div className="text-sm text-muted-foreground">Avg. Package</div>
              <div className="text-xl font-bold">{formatCurrency(college.avgPackage)}</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <div className="text-center">
              <span className="text-muted-foreground">Return on Investment: </span>
              <span className="font-bold text-green-600">
                {((college.avgPackage * 4) / fourYearTotal).toFixed(1)}x
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Facilities */}
      <Card>
        <CardHeader>
          <CardTitle>Included Facilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {college.facilities.map((facility, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-secondary rounded-full text-sm"
              >
                {facility}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}