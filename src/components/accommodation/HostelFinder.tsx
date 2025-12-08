import { useState } from 'react';
import { pgHostels, PGHostel } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { MapPin, Star, Wifi, Dumbbell, Utensils, Car, Search, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="w-3 h-3" />,
  Gym: <Dumbbell className="w-3 h-3" />,
  Meals: <Utensils className="w-3 h-3" />,
  Parking: <Car className="w-3 h-3" />,
};

export function HostelFinder() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState<string>('all');
  const [gender, setGender] = useState<string>('all');
  const [maxRent, setMaxRent] = useState([20000]);
  const [maxDistance, setMaxDistance] = useState([5]);

  const filteredHostels = pgHostels.filter((hostel) => {
    if (search && !hostel.name.toLowerCase().includes(search.toLowerCase()) && 
        !hostel.location.toLowerCase().includes(search.toLowerCase()) &&
        !hostel.nearbyColleges.some(c => c.toLowerCase().includes(search.toLowerCase()))) {
      return false;
    }
    if (type !== 'all' && hostel.type !== type) return false;
    if (gender !== 'all' && hostel.gender !== gender) return false;
    if (hostel.rent > maxRent[0]) return false;
    if (hostel.distance > maxDistance[0]) return false;
    return true;
  });

  const getGenderBadge = (g: string) => {
    const config = {
      male: { label: 'Boys Only', color: 'bg-primary/10 text-primary border-primary/30' },
      female: { label: 'Girls Only', color: 'bg-pink-500/10 text-pink-600 border-pink-500/30' },
      unisex: { label: 'Co-ed', color: 'bg-likely/10 text-likely border-likely/30' },
    };
    return config[g as keyof typeof config];
  };

  return (
    <div className="space-y-8">
      {/* Filters */}
      <Card className="border-2">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, location, or college..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="PG">PG</SelectItem>
                <SelectItem value="Hostel">Hostel</SelectItem>
                <SelectItem value="Flat">Flat</SelectItem>
              </SelectContent>
            </Select>

            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="male">Boys Only</SelectItem>
                <SelectItem value="female">Girls Only</SelectItem>
                <SelectItem value="unisex">Co-ed</SelectItem>
              </SelectContent>
            </Select>

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Max Rent: ₹{maxRent[0].toLocaleString()}</p>
              <Slider
                value={maxRent}
                onValueChange={setMaxRent}
                max={25000}
                min={5000}
                step={1000}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHostels.map((hostel, index) => {
          const genderBadge = getGenderBadge(hostel.gender);
          
          return (
            <Card 
              key={hostel.id}
              className="overflow-hidden border-2 hover:shadow-lg transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Building2 className="w-16 h-16 text-primary/40" />
              </div>
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display font-semibold">{hostel.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {hostel.location}
                    </p>
                  </div>
                  <Badge variant="outline">{hostel.type}</Badge>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={genderBadge.color}>
                    {genderBadge.label}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-likely fill-likely" />
                    <span className="font-medium">{hostel.rating}</span>
                    <span className="text-muted-foreground">({hostel.reviews})</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {hostel.amenities.slice(0, 4).map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs gap-1">
                      {amenityIcons[amenity] || null}
                      {amenity}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground">Monthly Rent</p>
                    <p className="font-display font-bold text-lg text-primary">
                      ₹{hostel.rent.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Distance</p>
                    <p className="font-semibold">{hostel.distance} km</p>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  Near: {hostel.nearbyColleges.join(', ')}
                </div>

                <Button className="w-full" variant="outline">
                  View Details
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredHostels.length === 0 && (
        <div className="text-center py-16">
          <Building2 className="w-16 h-16 mx-auto text-muted-foreground/40 mb-4" />
          <h3 className="font-display text-xl font-semibold mb-2">No accommodations found</h3>
          <p className="text-muted-foreground">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
