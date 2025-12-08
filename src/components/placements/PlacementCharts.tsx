import { placementData } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { TrendingUp, Briefcase, Building2 } from 'lucide-react';

export function PlacementCharts() {
  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="gradient-card border-2 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Package (IITs)</p>
                <p className="text-3xl font-display font-bold text-primary">₹25 LPA</p>
                <Badge variant="outline" className="mt-2 text-safe border-safe">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8.7% YoY
                </Badge>
              </div>
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-2 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Offers (2024)</p>
                <p className="text-3xl font-display font-bold text-primary">18,500+</p>
                <Badge variant="outline" className="mt-2 text-safe border-safe">
                  <Briefcase className="w-3 h-3 mr-1" />
                  Top IITs/NITs
                </Badge>
              </div>
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-2 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Hiring Companies</p>
                <p className="text-3xl font-display font-bold text-primary">1,200+</p>
                <Badge variant="outline" className="mt-2 text-likely border-likely">
                  <Building2 className="w-3 h-3 mr-1" />
                  Fortune 500
                </Badge>
              </div>
              <div className="w-12 h-12 rounded-xl bg-likely flex items-center justify-center">
                <Building2 className="w-6 h-6 text-likely-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Average Package Trends */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="font-display">Average Package Trends (LPA)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={placementData.avgPackages}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="year" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="IIT" 
                  stroke="hsl(234, 89%, 54%)" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(234, 89%, 54%)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="NIT" 
                  stroke="hsl(166, 76%, 42%)" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(166, 76%, 42%)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Private" 
                  stroke="hsl(38, 92%, 50%)" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(38, 92%, 50%)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sector Distribution */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="font-display">Placement by Sector</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={placementData.sectorDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {placementData.sectorDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Recruiters */}
        <Card className="border-2 lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display">Top Recruiters - Offers & Packages</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={placementData.topRecruiters} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="offers" name="Total Offers" fill="hsl(234, 89%, 54%)" radius={[0, 4, 4, 0]} />
                <Bar dataKey="avgPackage" name="Avg Package (LPA)" fill="hsl(166, 76%, 42%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
