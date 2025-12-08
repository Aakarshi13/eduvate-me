export interface College {
  id: string;
  name: string;
  shortName: string;
  location: string;
  state: string;
  type: 'IIT' | 'NIT' | 'IIIT' | 'GFTI' | 'State' | 'Private' | 'Medical' | 'Central';
  ranking: number;
  fees: number;
  avgPackage: number;
  highestPackage: number;
  placementRate: number;
  topRecruiters: string[];
  cutoffs: {
    jee: { general: number; obc: number; sc: number; st: number };
    neet?: { general: number; obc: number; sc: number; st: number };
    cuet?: { general: number; obc: number; sc: number; st: number };
  };
  facilities: string[];
  courses: string[];
  established: number;
  accreditation: string;
  imageUrl?: string;
}

export interface Exam {
  id: string;
  name: string;
  fullName: string;
  date: string;
  resultDate: string;
  counsellingStart: string;
  counsellingEnd: string;
  type: 'engineering' | 'medical' | 'general';
  registrationDeadline: string;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: number;
  eligibility: string;
  deadline: string;
  category: 'merit' | 'need' | 'category' | 'sports';
  examType: string[];
}

export interface PGHostel {
  id: string;
  name: string;
  type: 'PG' | 'Hostel' | 'Flat';
  location: string;
  nearbyColleges: string[];
  distance: number;
  rent: number;
  amenities: string[];
  gender: 'male' | 'female' | 'unisex';
  rating: number;
  reviews: number;
  imageUrl?: string;
}

export const colleges: College[] = [
  {
    id: '1',
    name: 'Indian Institute of Technology Bombay',
    shortName: 'IIT Bombay',
    location: 'Mumbai',
    state: 'Maharashtra',
    type: 'IIT',
    ranking: 1,
    fees: 250000,
    avgPackage: 2100000,
    highestPackage: 28000000,
    placementRate: 98,
    topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'Apple'],
    cutoffs: {
      jee: { general: 68, obc: 245, sc: 1200, st: 620 }
    },
    facilities: ['Library', 'Sports Complex', 'Hostel', 'Labs', 'Cafeteria', 'Gym'],
    courses: ['B.Tech', 'M.Tech', 'PhD'],
    established: 1958,
    accreditation: 'NAAC A++'
  },
  {
    id: '2',
    name: 'Indian Institute of Technology Delhi',
    shortName: 'IIT Delhi',
    location: 'New Delhi',
    state: 'Delhi',
    type: 'IIT',
    ranking: 2,
    fees: 245000,
    avgPackage: 2000000,
    highestPackage: 26000000,
    placementRate: 97,
    topRecruiters: ['Google', 'Facebook', 'Uber', 'McKinsey', 'BCG'],
    cutoffs: {
      jee: { general: 115, obc: 320, sc: 1450, st: 750 }
    },
    facilities: ['Library', 'Sports Complex', 'Hostel', 'Labs', 'Cafeteria'],
    courses: ['B.Tech', 'M.Tech', 'MBA', 'PhD'],
    established: 1961,
    accreditation: 'NAAC A++'
  },
  {
    id: '3',
    name: 'Indian Institute of Technology Madras',
    shortName: 'IIT Madras',
    location: 'Chennai',
    state: 'Tamil Nadu',
    type: 'IIT',
    ranking: 3,
    fees: 230000,
    avgPackage: 1900000,
    highestPackage: 24000000,
    placementRate: 96,
    topRecruiters: ['Microsoft', 'Qualcomm', 'Intel', 'Samsung', 'Texas Instruments'],
    cutoffs: {
      jee: { general: 150, obc: 380, sc: 1600, st: 820 }
    },
    facilities: ['Library', 'Sports Complex', 'Hostel', 'Labs', 'Research Park'],
    courses: ['B.Tech', 'M.Tech', 'MS', 'PhD'],
    established: 1959,
    accreditation: 'NAAC A++'
  },
  {
    id: '4',
    name: 'National Institute of Technology Trichy',
    shortName: 'NIT Trichy',
    location: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    type: 'NIT',
    ranking: 8,
    fees: 180000,
    avgPackage: 1200000,
    highestPackage: 15000000,
    placementRate: 94,
    topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'L&T'],
    cutoffs: {
      jee: { general: 2500, obc: 4500, sc: 12000, st: 8000 }
    },
    facilities: ['Library', 'Sports Complex', 'Hostel', 'Labs'],
    courses: ['B.Tech', 'M.Tech', 'PhD'],
    established: 1964,
    accreditation: 'NAAC A+'
  },
  {
    id: '5',
    name: 'National Institute of Technology Karnataka',
    shortName: 'NIT Surathkal',
    location: 'Mangalore',
    state: 'Karnataka',
    type: 'NIT',
    ranking: 10,
    fees: 175000,
    avgPackage: 1100000,
    highestPackage: 14000000,
    placementRate: 92,
    topRecruiters: ['Oracle', 'Adobe', 'SAP', 'Cisco', 'VMware'],
    cutoffs: {
      jee: { general: 3200, obc: 5800, sc: 14000, st: 9500 }
    },
    facilities: ['Library', 'Beach Campus', 'Hostel', 'Labs'],
    courses: ['B.Tech', 'M.Tech', 'PhD'],
    established: 1960,
    accreditation: 'NAAC A+'
  },
  {
    id: '6',
    name: 'IIIT Hyderabad',
    shortName: 'IIIT-H',
    location: 'Hyderabad',
    state: 'Telangana',
    type: 'IIIT',
    ranking: 12,
    fees: 320000,
    avgPackage: 1800000,
    highestPackage: 22000000,
    placementRate: 95,
    topRecruiters: ['Google', 'Amazon', 'Microsoft', 'Uber', 'Flipkart'],
    cutoffs: {
      jee: { general: 1800, obc: 3500, sc: 9000, st: 6000 }
    },
    facilities: ['Library', 'Innovation Center', 'Hostel', 'Labs'],
    courses: ['B.Tech', 'M.Tech', 'PhD'],
    established: 1998,
    accreditation: 'NAAC A'
  },
  {
    id: '7',
    name: 'All India Institute of Medical Sciences Delhi',
    shortName: 'AIIMS Delhi',
    location: 'New Delhi',
    state: 'Delhi',
    type: 'Medical',
    ranking: 1,
    fees: 15000,
    avgPackage: 1500000,
    highestPackage: 5000000,
    placementRate: 100,
    topRecruiters: ['Apollo', 'Fortis', 'Max Healthcare', 'Government Hospitals'],
    cutoffs: {
      jee: { general: 99999, obc: 99999, sc: 99999, st: 99999 },
      neet: { general: 50, obc: 150, sc: 800, st: 500 }
    },
    facilities: ['Hospital', 'Research Labs', 'Hostel', 'Library'],
    courses: ['MBBS', 'MD', 'MS', 'PhD'],
    established: 1956,
    accreditation: 'NAAC A++'
  },
  {
    id: '8',
    name: 'Delhi University',
    shortName: 'DU',
    location: 'New Delhi',
    state: 'Delhi',
    type: 'Central',
    ranking: 15,
    fees: 50000,
    avgPackage: 800000,
    highestPackage: 3500000,
    placementRate: 85,
    topRecruiters: ['Deloitte', 'EY', 'KPMG', 'PwC', 'HUL'],
    cutoffs: {
      jee: { general: 99999, obc: 99999, sc: 99999, st: 99999 },
      cuet: { general: 750, obc: 680, sc: 550, st: 500 }
    },
    facilities: ['Library', 'Sports', 'Hostels', 'Cafeteria'],
    courses: ['BA', 'B.Com', 'B.Sc', 'MA', 'M.Com'],
    established: 1922,
    accreditation: 'NAAC A+'
  },
  {
    id: '9',
    name: 'Birla Institute of Technology and Science',
    shortName: 'BITS Pilani',
    location: 'Pilani',
    state: 'Rajasthan',
    type: 'Private',
    ranking: 6,
    fees: 550000,
    avgPackage: 1600000,
    highestPackage: 18000000,
    placementRate: 93,
    topRecruiters: ['Google', 'Microsoft', 'Goldman Sachs', 'DE Shaw', 'Sprinklr'],
    cutoffs: {
      jee: { general: 2200, obc: 4000, sc: 10000, st: 7000 }
    },
    facilities: ['Library', 'Sports', 'Hostel', 'Labs', 'Innovation Hub'],
    courses: ['B.Tech', 'M.Tech', 'MBA', 'PhD'],
    established: 1964,
    accreditation: 'NAAC A'
  },
  {
    id: '10',
    name: 'VIT Vellore',
    shortName: 'VIT',
    location: 'Vellore',
    state: 'Tamil Nadu',
    type: 'Private',
    ranking: 18,
    fees: 450000,
    avgPackage: 700000,
    highestPackage: 12000000,
    placementRate: 88,
    topRecruiters: ['TCS', 'Wipro', 'Cognizant', 'Infosys', 'Capgemini'],
    cutoffs: {
      jee: { general: 8000, obc: 12000, sc: 25000, st: 18000 }
    },
    facilities: ['Library', 'Sports', 'Hostel', 'Labs', 'Cafeteria'],
    courses: ['B.Tech', 'M.Tech', 'MBA'],
    established: 1984,
    accreditation: 'NAAC A++'
  }
];

export const exams: Exam[] = [
  {
    id: '1',
    name: 'JEE Main 2025',
    fullName: 'Joint Entrance Examination Main',
    date: '2025-01-22',
    resultDate: '2025-02-15',
    counsellingStart: '2025-06-15',
    counsellingEnd: '2025-08-30',
    type: 'engineering',
    registrationDeadline: '2024-12-15'
  },
  {
    id: '2',
    name: 'JEE Advanced 2025',
    fullName: 'Joint Entrance Examination Advanced',
    date: '2025-05-25',
    resultDate: '2025-06-10',
    counsellingStart: '2025-06-20',
    counsellingEnd: '2025-07-31',
    type: 'engineering',
    registrationDeadline: '2025-05-10'
  },
  {
    id: '3',
    name: 'NEET UG 2025',
    fullName: 'National Eligibility cum Entrance Test',
    date: '2025-05-04',
    resultDate: '2025-06-14',
    counsellingStart: '2025-07-01',
    counsellingEnd: '2025-09-30',
    type: 'medical',
    registrationDeadline: '2025-03-15'
  },
  {
    id: '4',
    name: 'CUET 2025',
    fullName: 'Common University Entrance Test',
    date: '2025-05-15',
    resultDate: '2025-06-20',
    counsellingStart: '2025-07-01',
    counsellingEnd: '2025-08-15',
    type: 'general',
    registrationDeadline: '2025-04-01'
  },
  {
    id: '5',
    name: 'BITSAT 2025',
    fullName: 'BITS Admission Test',
    date: '2025-05-20',
    resultDate: '2025-06-01',
    counsellingStart: '2025-06-15',
    counsellingEnd: '2025-07-20',
    type: 'engineering',
    registrationDeadline: '2025-04-30'
  },
  {
    id: '6',
    name: 'VITEEE 2025',
    fullName: 'VIT Engineering Entrance Exam',
    date: '2025-04-19',
    resultDate: '2025-05-05',
    counsellingStart: '2025-05-15',
    counsellingEnd: '2025-06-30',
    type: 'engineering',
    registrationDeadline: '2025-03-31'
  }
];

export const scholarships: Scholarship[] = [
  {
    id: '1',
    name: 'Prime Minister\'s Scholarship Scheme',
    provider: 'Government of India',
    amount: 36000,
    eligibility: 'Children of ex-servicemen with 60%+ marks',
    deadline: '2025-08-31',
    category: 'merit',
    examType: ['jee', 'neet', 'cuet']
  },
  {
    id: '2',
    name: 'National Scholarship Portal',
    provider: 'Ministry of Education',
    amount: 50000,
    eligibility: 'Family income below 8 LPA',
    deadline: '2025-10-31',
    category: 'need',
    examType: ['jee', 'neet', 'cuet']
  },
  {
    id: '3',
    name: 'AICTE Pragati Scholarship',
    provider: 'AICTE',
    amount: 50000,
    eligibility: 'Girl students in technical education',
    deadline: '2025-11-30',
    category: 'category',
    examType: ['jee']
  },
  {
    id: '4',
    name: 'Kishore Vaigyanik Protsahan Yojana',
    provider: 'DST, Government of India',
    amount: 80000,
    eligibility: 'Students pursuing basic sciences',
    deadline: '2025-08-15',
    category: 'merit',
    examType: ['cuet']
  },
  {
    id: '5',
    name: 'Post Matric Scholarship for SC/ST',
    provider: 'Ministry of Social Justice',
    amount: 45000,
    eligibility: 'SC/ST students with 50%+ marks',
    deadline: '2025-12-31',
    category: 'category',
    examType: ['jee', 'neet', 'cuet']
  }
];

export const pgHostels: PGHostel[] = [
  {
    id: '1',
    name: 'Sunshine PG for Boys',
    type: 'PG',
    location: 'Powai, Mumbai',
    nearbyColleges: ['IIT Bombay', 'VJTI'],
    distance: 1.2,
    rent: 12000,
    amenities: ['WiFi', 'AC', 'Laundry', 'Meals', 'Gym'],
    gender: 'male',
    rating: 4.5,
    reviews: 124
  },
  {
    id: '2',
    name: 'Green Valley Hostel',
    type: 'Hostel',
    location: 'Hauz Khas, Delhi',
    nearbyColleges: ['IIT Delhi', 'JNU', 'Delhi University'],
    distance: 0.8,
    rent: 15000,
    amenities: ['WiFi', 'AC', 'Laundry', 'Meals', 'Library'],
    gender: 'unisex',
    rating: 4.2,
    reviews: 89
  },
  {
    id: '3',
    name: 'Lakshmi Girls PG',
    type: 'PG',
    location: 'Adyar, Chennai',
    nearbyColleges: ['IIT Madras', 'Anna University'],
    distance: 2.0,
    rent: 9000,
    amenities: ['WiFi', 'Meals', 'Security', 'Laundry'],
    gender: 'female',
    rating: 4.7,
    reviews: 156
  },
  {
    id: '4',
    name: 'Scholar\'s Den',
    type: 'Hostel',
    location: 'Gachibowli, Hyderabad',
    nearbyColleges: ['IIIT Hyderabad', 'University of Hyderabad'],
    distance: 1.5,
    rent: 11000,
    amenities: ['WiFi', 'AC', 'Meals', 'Sports', 'Parking'],
    gender: 'male',
    rating: 4.3,
    reviews: 78
  },
  {
    id: '5',
    name: 'Campus View Apartments',
    type: 'Flat',
    location: 'Pilani, Rajasthan',
    nearbyColleges: ['BITS Pilani'],
    distance: 0.5,
    rent: 8000,
    amenities: ['WiFi', 'Kitchen', 'Parking', 'Security'],
    gender: 'unisex',
    rating: 4.0,
    reviews: 45
  }
];

export const placementData = {
  avgPackages: [
    { year: '2020', IIT: 18, NIT: 9, Private: 6 },
    { year: '2021', IIT: 19, NIT: 10, Private: 6.5 },
    { year: '2022', IIT: 21, NIT: 11, Private: 7 },
    { year: '2023', IIT: 23, NIT: 12, Private: 7.5 },
    { year: '2024', IIT: 25, NIT: 13, Private: 8 }
  ],
  sectorDistribution: [
    { name: 'IT/Software', value: 45, color: 'hsl(234, 89%, 54%)' },
    { name: 'Finance', value: 20, color: 'hsl(166, 76%, 42%)' },
    { name: 'Consulting', value: 15, color: 'hsl(38, 92%, 50%)' },
    { name: 'Core Engineering', value: 12, color: 'hsl(280, 70%, 50%)' },
    { name: 'Others', value: 8, color: 'hsl(0, 0%, 60%)' }
  ],
  topRecruiters: [
    { name: 'Google', offers: 450, avgPackage: 45 },
    { name: 'Microsoft', offers: 380, avgPackage: 42 },
    { name: 'Amazon', offers: 520, avgPackage: 38 },
    { name: 'Goldman Sachs', offers: 120, avgPackage: 55 },
    { name: 'Flipkart', offers: 280, avgPackage: 32 }
  ]
};
