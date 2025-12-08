export interface YearlyCutoff {
  year: number;
  general: number;
  obc: number;
  sc: number;
  st: number;
  ews?: number;
}

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
    jee?: YearlyCutoff[];
    neet?: YearlyCutoff[];
    cuet?: YearlyCutoff[];
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

// Helper to get the latest cutoff for backward compatibility
export const getLatestCutoff = (cutoffs: YearlyCutoff[] | undefined): { general: number; obc: number; sc: number; st: number } | undefined => {
  if (!cutoffs || cutoffs.length === 0) return undefined;
  const latest = cutoffs.reduce((a, b) => a.year > b.year ? a : b);
  return { general: latest.general, obc: latest.obc, sc: latest.sc, st: latest.st };
};

export const colleges: College[] = [
  // ============ IITs ============
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
      jee: [
        { year: 2024, general: 68, obc: 245, sc: 1200, st: 620, ews: 180 },
        { year: 2023, general: 72, obc: 260, sc: 1250, st: 650, ews: 195 },
        { year: 2022, general: 66, obc: 238, sc: 1180, st: 605, ews: 175 },
        { year: 2021, general: 75, obc: 275, sc: 1320, st: 680, ews: 210 },
        { year: 2020, general: 79, obc: 290, sc: 1380, st: 710, ews: 225 },
        { year: 2019, general: 82, obc: 305, sc: 1420, st: 735, ews: 240 },
        { year: 2018, general: 85, obc: 318, sc: 1480, st: 765 },
        { year: 2017, general: 88, obc: 332, sc: 1520, st: 790 },
        { year: 2016, general: 92, obc: 348, sc: 1580, st: 820 },
        { year: 2015, general: 95, obc: 365, sc: 1650, st: 855 }
      ]
    },
    facilities: ['Library', 'Sports Complex', 'Hostel', 'Labs', 'Cafeteria', 'Gym', 'Swimming Pool'],
    courses: ['B.Tech', 'M.Tech', 'PhD', 'Dual Degree'],
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
      jee: [
        { year: 2024, general: 115, obc: 320, sc: 1450, st: 750, ews: 245 },
        { year: 2023, general: 120, obc: 335, sc: 1500, st: 780, ews: 260 },
        { year: 2022, general: 110, obc: 308, sc: 1420, st: 725, ews: 235 },
        { year: 2021, general: 125, obc: 350, sc: 1560, st: 810, ews: 275 },
        { year: 2020, general: 132, obc: 370, sc: 1620, st: 845, ews: 295 },
        { year: 2019, general: 138, obc: 388, sc: 1680, st: 875, ews: 310 },
        { year: 2018, general: 145, obc: 405, sc: 1750, st: 910 },
        { year: 2017, general: 152, obc: 425, sc: 1820, st: 945 },
        { year: 2016, general: 160, obc: 448, sc: 1900, st: 985 },
        { year: 2015, general: 168, obc: 470, sc: 1980, st: 1025 }
      ]
    },
    facilities: ['Library', 'Sports Complex', 'Hostel', 'Labs', 'Cafeteria', 'Incubation Center'],
    courses: ['B.Tech', 'M.Tech', 'MBA', 'PhD', 'Dual Degree'],
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
      jee: [
        { year: 2024, general: 150, obc: 380, sc: 1600, st: 820, ews: 290 },
        { year: 2023, general: 158, obc: 398, sc: 1650, st: 855, ews: 305 },
        { year: 2022, general: 145, obc: 368, sc: 1560, st: 795, ews: 278 },
        { year: 2021, general: 165, obc: 418, sc: 1720, st: 890, ews: 325 },
        { year: 2020, general: 175, obc: 440, sc: 1800, st: 935, ews: 345 },
        { year: 2019, general: 185, obc: 465, sc: 1880, st: 975, ews: 365 },
        { year: 2018, general: 195, obc: 490, sc: 1960, st: 1020 },
        { year: 2017, general: 205, obc: 515, sc: 2050, st: 1065 },
        { year: 2016, general: 218, obc: 545, sc: 2150, st: 1115 },
        { year: 2015, general: 230, obc: 575, sc: 2260, st: 1170 }
      ]
    },
    facilities: ['Library', 'Sports Complex', 'Hostel', 'Labs', 'Research Park', 'Deer Park'],
    courses: ['B.Tech', 'M.Tech', 'MS', 'PhD', 'Dual Degree'],
    established: 1959,
    accreditation: 'NAAC A++'
  },
  {
    id: '4',
    name: 'Indian Institute of Technology Kanpur',
    shortName: 'IIT Kanpur',
    location: 'Kanpur',
    state: 'Uttar Pradesh',
    type: 'IIT',
    ranking: 4,
    fees: 235000,
    avgPackage: 1850000,
    highestPackage: 23000000,
    placementRate: 95,
    topRecruiters: ['Google', 'Microsoft', 'Qualcomm', 'Samsung', 'Adobe'],
    cutoffs: {
      jee: [
        { year: 2024, general: 180, obc: 420, sc: 1750, st: 890, ews: 320 },
        { year: 2023, general: 190, obc: 445, sc: 1820, st: 925, ews: 340 },
        { year: 2022, general: 172, obc: 405, sc: 1700, st: 865, ews: 305 },
        { year: 2021, general: 200, obc: 470, sc: 1900, st: 965, ews: 360 },
        { year: 2020, general: 212, obc: 498, sc: 1980, st: 1010, ews: 382 },
        { year: 2019, general: 225, obc: 528, sc: 2070, st: 1055, ews: 405 },
        { year: 2018, general: 238, obc: 558, sc: 2160, st: 1105 },
        { year: 2017, general: 252, obc: 590, sc: 2260, st: 1155 },
        { year: 2016, general: 268, obc: 625, sc: 2370, st: 1210 },
        { year: 2015, general: 285, obc: 665, sc: 2490, st: 1270 }
      ]
    },
    facilities: ['Library', 'Sports Complex', 'Hostel', 'Labs', 'Cafeteria', 'Airstrip'],
    courses: ['B.Tech', 'M.Tech', 'MBA', 'PhD'],
    established: 1959,
    accreditation: 'NAAC A++'
  },
  {
    id: '5',
    name: 'Indian Institute of Technology Kharagpur',
    shortName: 'IIT Kharagpur',
    location: 'Kharagpur',
    state: 'West Bengal',
    type: 'IIT',
    ranking: 5,
    fees: 225000,
    avgPackage: 1750000,
    highestPackage: 22000000,
    placementRate: 94,
    topRecruiters: ['Google', 'Amazon', 'Microsoft', 'Goldman Sachs', 'Schlumberger'],
    cutoffs: {
      jee: [
        { year: 2024, general: 220, obc: 480, sc: 1900, st: 960, ews: 365 },
        { year: 2023, general: 232, obc: 505, sc: 1980, st: 1000, ews: 385 },
        { year: 2022, general: 210, obc: 460, sc: 1850, st: 935, ews: 350 },
        { year: 2021, general: 245, obc: 535, sc: 2080, st: 1050, ews: 410 },
        { year: 2020, general: 260, obc: 568, sc: 2180, st: 1105, ews: 435 },
        { year: 2019, general: 275, obc: 600, sc: 2290, st: 1160, ews: 462 },
        { year: 2018, general: 292, obc: 638, sc: 2410, st: 1220 },
        { year: 2017, general: 310, obc: 678, sc: 2540, st: 1285 },
        { year: 2016, general: 330, obc: 722, sc: 2680, st: 1355 },
        { year: 2015, general: 352, obc: 770, sc: 2840, st: 1435 }
      ]
    },
    facilities: ['Library', 'Sports Complex', 'Hostel', 'Labs', 'Technology Park', 'Museum'],
    courses: ['B.Tech', 'M.Tech', 'MBA', 'LLB', 'PhD'],
    established: 1951,
    accreditation: 'NAAC A++'
  },
  {
    id: '6',
    name: 'Indian Institute of Technology Roorkee',
    shortName: 'IIT Roorkee',
    location: 'Roorkee',
    state: 'Uttarakhand',
    type: 'IIT',
    ranking: 6,
    fees: 220000,
    avgPackage: 1650000,
    highestPackage: 20000000,
    placementRate: 93,
    topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Uber', 'Flipkart'],
    cutoffs: {
      jee: [
        { year: 2024, general: 350, obc: 650, sc: 2400, st: 1200, ews: 520 },
        { year: 2023, general: 368, obc: 685, sc: 2500, st: 1250, ews: 548 },
        { year: 2022, general: 335, obc: 625, sc: 2340, st: 1165, ews: 498 },
        { year: 2021, general: 388, obc: 725, sc: 2620, st: 1310, ews: 580 },
        { year: 2020, general: 410, obc: 768, sc: 2750, st: 1375, ews: 615 },
        { year: 2019, general: 435, obc: 815, sc: 2890, st: 1445, ews: 652 },
        { year: 2018, general: 462, obc: 865, sc: 3050, st: 1520 },
        { year: 2017, general: 492, obc: 920, sc: 3220, st: 1605 },
        { year: 2016, general: 525, obc: 980, sc: 3410, st: 1700 },
        { year: 2015, general: 560, obc: 1045, sc: 3620, st: 1805 }
      ]
    },
    facilities: ['Library', 'Sports Complex', 'Hostel', 'Labs', 'Cafeteria'],
    courses: ['B.Tech', 'M.Tech', 'MBA', 'PhD'],
    established: 1847,
    accreditation: 'NAAC A++'
  },
  {
    id: '7',
    name: 'Indian Institute of Technology Guwahati',
    shortName: 'IIT Guwahati',
    location: 'Guwahati',
    state: 'Assam',
    type: 'IIT',
    ranking: 7,
    fees: 215000,
    avgPackage: 1550000,
    highestPackage: 18000000,
    placementRate: 92,
    topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Oracle', 'Samsung'],
    cutoffs: {
      jee: [
        { year: 2024, general: 680, obc: 1100, sc: 3500, st: 1650, ews: 850 },
        { year: 2023, general: 715, obc: 1155, sc: 3650, st: 1720, ews: 895 },
        { year: 2022, general: 650, obc: 1055, sc: 3410, st: 1600, ews: 815 },
        { year: 2021, general: 755, obc: 1220, sc: 3820, st: 1805, ews: 945 },
        { year: 2020, general: 798, obc: 1290, sc: 4010, st: 1895, ews: 1000 },
        { year: 2019, general: 845, obc: 1365, sc: 4220, st: 1995, ews: 1060 },
        { year: 2018, general: 895, obc: 1448, sc: 4450, st: 2105 },
        { year: 2017, general: 950, obc: 1535, sc: 4700, st: 2225 },
        { year: 2016, general: 1010, obc: 1632, sc: 4980, st: 2360 },
        { year: 2015, general: 1075, obc: 1738, sc: 5290, st: 2505 }
      ]
    },
    facilities: ['Library', 'Sports Complex', 'Hostel', 'Labs', 'Lake View Campus'],
    courses: ['B.Tech', 'M.Tech', 'PhD'],
    established: 1994,
    accreditation: 'NAAC A++'
  },
  {
    id: '8',
    name: 'Indian Institute of Technology Hyderabad',
    shortName: 'IIT Hyderabad',
    location: 'Hyderabad',
    state: 'Telangana',
    type: 'IIT',
    ranking: 8,
    fees: 210000,
    avgPackage: 1450000,
    highestPackage: 16000000,
    placementRate: 90,
    topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Qualcomm', 'MediaTek'],
    cutoffs: {
      jee: [
        { year: 2024, general: 1200, obc: 1850, sc: 5200, st: 2500, ews: 1450 },
        { year: 2023, general: 1260, obc: 1942, sc: 5420, st: 2605, ews: 1522 },
        { year: 2022, general: 1150, obc: 1775, sc: 5070, st: 2425, ews: 1390 },
        { year: 2021, general: 1330, obc: 2050, sc: 5680, st: 2735, ews: 1605 },
        { year: 2020, general: 1405, obc: 2168, sc: 5970, st: 2875, ews: 1698 },
        { year: 2019, general: 1485, obc: 2292, sc: 6280, st: 3025, ews: 1795 },
        { year: 2018, general: 1572, obc: 2425, sc: 6620, st: 3190 },
        { year: 2017, general: 1665, obc: 2570, sc: 6990, st: 3370 },
        { year: 2016, general: 1768, obc: 2728, sc: 7400, st: 3570 },
        { year: 2015, general: 1880, obc: 2902, sc: 7850, st: 3790 }
      ]
    },
    facilities: ['Library', 'Sports Complex', 'Hostel', 'Labs', 'Research Center'],
    courses: ['B.Tech', 'M.Tech', 'PhD'],
    established: 2008,
    accreditation: 'NAAC A+'
  },
  {
    id: '9',
    name: 'Indian Institute of Technology BHU',
    shortName: 'IIT BHU',
    location: 'Varanasi',
    state: 'Uttar Pradesh',
    type: 'IIT',
    ranking: 9,
    fees: 205000,
    avgPackage: 1400000,
    highestPackage: 15000000,
    placementRate: 89,
    topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Samsung', 'Oracle'],
    cutoffs: {
      jee: [
        { year: 2024, general: 1500, obc: 2200, sc: 6000, st: 2900, ews: 1750 },
        { year: 2023, general: 1575, obc: 2310, sc: 6250, st: 3020, ews: 1838 },
        { year: 2022, general: 1438, obc: 2112, sc: 5850, st: 2815, ews: 1678 },
        { year: 2021, general: 1662, obc: 2440, sc: 6550, st: 3170, ews: 1940 },
        { year: 2020, general: 1758, obc: 2580, sc: 6880, st: 3335, ews: 2052 },
        { year: 2019, general: 1860, obc: 2730, sc: 7230, st: 3510, ews: 2172 },
        { year: 2018, general: 1970, obc: 2890, sc: 7620, st: 3700 },
        { year: 2017, general: 2088, obc: 3065, sc: 8040, st: 3910 },
        { year: 2016, general: 2218, obc: 3255, sc: 8510, st: 4140 },
        { year: 2015, general: 2358, obc: 3462, sc: 9020, st: 4392 }
      ]
    },
    facilities: ['Library', 'Sports Complex', 'Hostel', 'Labs', 'Temple Campus'],
    courses: ['B.Tech', 'M.Tech', 'PhD'],
    established: 1919,
    accreditation: 'NAAC A+'
  },
  {
    id: '10',
    name: 'Indian Institute of Technology Indore',
    shortName: 'IIT Indore',
    location: 'Indore',
    state: 'Madhya Pradesh',
    type: 'IIT',
    ranking: 10,
    fees: 200000,
    avgPackage: 1350000,
    highestPackage: 14000000,
    placementRate: 88,
    topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Flipkart', 'Paytm'],
    cutoffs: {
      jee: [
        { year: 2024, general: 1800, obc: 2600, sc: 6800, st: 3300, ews: 2050 },
        { year: 2023, general: 1890, obc: 2730, sc: 7090, st: 3438, ews: 2152 },
        { year: 2022, general: 1725, obc: 2495, sc: 6630, st: 3202, ews: 1968 },
        { year: 2021, general: 1995, obc: 2882, sc: 7430, st: 3608, ews: 2272 },
        { year: 2020, general: 2110, obc: 3048, sc: 7800, st: 3792, ews: 2402 },
        { year: 2019, general: 2232, obc: 3225, sc: 8200, st: 3990, ews: 2540 },
        { year: 2018, general: 2362, obc: 3415, sc: 8645, st: 4210 },
        { year: 2017, general: 2502, obc: 3618, sc: 9125, st: 4450 },
        { year: 2016, general: 2655, obc: 3840, sc: 9660, st: 4715 },
        { year: 2015, general: 2822, obc: 4082, sc: 10250, st: 5005 }
      ]
    },
    facilities: ['Library', 'Sports Complex', 'Hostel', 'Labs'],
    courses: ['B.Tech', 'M.Tech', 'PhD'],
    established: 2009,
    accreditation: 'NAAC A+'
  },

  // ============ NITs ============
  {
    id: '11',
    name: 'National Institute of Technology Trichy',
    shortName: 'NIT Trichy',
    location: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    type: 'NIT',
    ranking: 11,
    fees: 180000,
    avgPackage: 1200000,
    highestPackage: 15000000,
    placementRate: 94,
    topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'L&T'],
    cutoffs: {
      jee: [
        { year: 2024, general: 2500, obc: 4500, sc: 12000, st: 8000, ews: 3200 },
        { year: 2023, general: 2625, obc: 4725, sc: 12500, st: 8340, ews: 3360 },
        { year: 2022, general: 2395, obc: 4320, sc: 11700, st: 7770, ews: 3068 },
        { year: 2021, general: 2770, obc: 4985, sc: 13100, st: 8755, ews: 3545 },
        { year: 2020, general: 2928, obc: 5272, sc: 13750, st: 9195, ews: 3750 },
        { year: 2019, general: 3098, obc: 5578, sc: 14450, st: 9665, ews: 3968 },
        { year: 2018, general: 3278, obc: 5902, sc: 15200, st: 10175 },
        { year: 2017, general: 3472, obc: 6250, sc: 16010, st: 10725 },
        { year: 2016, general: 3682, obc: 6628, sc: 16880, st: 11315 },
        { year: 2015, general: 3908, obc: 7035, sc: 17820, st: 11950 }
      ]
    },
    facilities: ['Library', 'Sports Complex', 'Hostel', 'Labs'],
    courses: ['B.Tech', 'M.Tech', 'PhD'],
    established: 1964,
    accreditation: 'NAAC A+'
  },
  {
    id: '12',
    name: 'National Institute of Technology Karnataka',
    shortName: 'NIT Surathkal',
    location: 'Mangalore',
    state: 'Karnataka',
    type: 'NIT',
    ranking: 12,
    fees: 175000,
    avgPackage: 1100000,
    highestPackage: 14000000,
    placementRate: 92,
    topRecruiters: ['Oracle', 'Adobe', 'SAP', 'Cisco', 'VMware'],
    cutoffs: {
      jee: [
        { year: 2024, general: 3200, obc: 5800, sc: 14000, st: 9500, ews: 4100 },
        { year: 2023, general: 3360, obc: 6090, sc: 14600, st: 9900, ews: 4305 },
        { year: 2022, general: 3068, obc: 5565, sc: 13650, st: 9228, ews: 3932 },
        { year: 2021, general: 3548, obc: 6432, sc: 15310, st: 10395, ews: 4542 },
        { year: 2020, general: 3752, obc: 6800, sc: 16080, st: 10920, ews: 4802 },
        { year: 2019, general: 3970, obc: 7195, sc: 16900, st: 11480, ews: 5080 },
        { year: 2018, general: 4202, obc: 7615, sc: 17800, st: 12095 },
        { year: 2017, general: 4450, obc: 8065, sc: 18760, st: 12755 },
        { year: 2016, general: 4718, obc: 8550, sc: 19790, st: 13460 },
        { year: 2015, general: 5005, obc: 9075, sc: 20890, st: 14210 }
      ]
    },
    facilities: ['Library', 'Beach Campus', 'Hostel', 'Labs'],
    courses: ['B.Tech', 'M.Tech', 'PhD'],
    established: 1960,
    accreditation: 'NAAC A+'
  },
  {
    id: '13',
    name: 'National Institute of Technology Warangal',
    shortName: 'NIT Warangal',
    location: 'Warangal',
    state: 'Telangana',
    type: 'NIT',
    ranking: 13,
    fees: 170000,
    avgPackage: 1050000,
    highestPackage: 13000000,
    placementRate: 91,
    topRecruiters: ['Microsoft', 'Amazon', 'Google', 'Qualcomm', 'Nvidia'],
    cutoffs: {
      jee: [
        { year: 2024, general: 4000, obc: 7000, sc: 16000, st: 11000, ews: 5100 },
        { year: 2023, general: 4200, obc: 7350, sc: 16680, st: 11462, ews: 5355 },
        { year: 2022, general: 3835, obc: 6718, sc: 15600, st: 10692, ews: 4893 },
        { year: 2021, general: 4432, obc: 7760, sc: 17490, st: 12035, ews: 5652 },
        { year: 2020, general: 4688, obc: 8208, sc: 18365, st: 12640, ews: 5980 },
        { year: 2019, general: 4962, obc: 8685, sc: 19300, st: 13285, ews: 6328 },
        { year: 2018, general: 5252, obc: 9195, sc: 20330, st: 13995 },
        { year: 2017, general: 5562, obc: 9738, sc: 21430, st: 14760 },
        { year: 2016, general: 5898, obc: 10325, sc: 22610, st: 15575 },
        { year: 2015, general: 6258, obc: 10955, sc: 23870, st: 16445 }
      ]
    },
    facilities: ['Library', 'Sports Complex', 'Hostel', 'Labs', 'Cafeteria'],
    courses: ['B.Tech', 'M.Tech', 'PhD'],
    established: 1959,
    accreditation: 'NAAC A+'
  },
  {
    id: '14',
    name: 'National Institute of Technology Rourkela',
    shortName: 'NIT Rourkela',
    location: 'Rourkela',
    state: 'Odisha',
    type: 'NIT',
    ranking: 14,
    fees: 165000,
    avgPackage: 980000,
    highestPackage: 12000000,
    placementRate: 89,
    topRecruiters: ['Tata Steel', 'JSPL', 'L&T', 'TCS', 'Infosys'],
    cutoffs: {
      jee: [
        { year: 2024, general: 5500, obc: 9000, sc: 20000, st: 14000, ews: 6800 },
        { year: 2023, general: 5775, obc: 9450, sc: 20850, st: 14595, ews: 7140 },
        { year: 2022, general: 5275, obc: 8632, sc: 19500, st: 13608, ews: 6520 },
        { year: 2021, general: 6095, obc: 9975, sc: 21880, st: 15328, ews: 7535 },
        { year: 2020, general: 6445, obc: 10548, sc: 22975, st: 16098, ews: 7970 },
        { year: 2019, general: 6820, obc: 11162, sc: 24140, st: 16920, ews: 8432 },
        { year: 2018, general: 7220, obc: 11818, sc: 25420, st: 17825 },
        { year: 2017, general: 7648, obc: 12518, sc: 26810, st: 18805 },
        { year: 2016, general: 8108, obc: 13272, sc: 28300, st: 19852 },
        { year: 2015, general: 8602, obc: 14080, sc: 29880, st: 20962 }
      ]
    },
    facilities: ['Library', 'Sports Complex', 'Hostel', 'Labs', 'Steel Plant Visits'],
    courses: ['B.Tech', 'M.Tech', 'PhD'],
    established: 1961,
    accreditation: 'NAAC A+'
  },
  {
    id: '15',
    name: 'National Institute of Technology Calicut',
    shortName: 'NIT Calicut',
    location: 'Kozhikode',
    state: 'Kerala',
    type: 'NIT',
    ranking: 15,
    fees: 160000,
    avgPackage: 920000,
    highestPackage: 11000000,
    placementRate: 88,
    topRecruiters: ['TCS', 'Infosys', 'Wipro', 'UST Global', 'Cognizant'],
    cutoffs: {
      jee: [
        { year: 2024, general: 6200, obc: 10500, sc: 22000, st: 15500, ews: 7700 },
        { year: 2023, general: 6510, obc: 11025, sc: 22935, st: 16150, ews: 8085 },
        { year: 2022, general: 5945, obc: 10072, sc: 21450, st: 15065, ews: 7385 },
        { year: 2021, general: 6870, obc: 11632, sc: 24060, st: 16962, ews: 8532 },
        { year: 2020, general: 7268, obc: 12305, sc: 25265, st: 17815, ews: 9022 },
        { year: 2019, general: 7690, obc: 13020, sc: 26555, st: 18725, ews: 9542 },
        { year: 2018, general: 8140, obc: 13785, sc: 27960, st: 19730 },
        { year: 2017, general: 8622, obc: 14602, sc: 29490, st: 20815 },
        { year: 2016, general: 9138, obc: 15480, sc: 31130, st: 21978 },
        { year: 2015, general: 9692, obc: 16420, sc: 32890, st: 23210 }
      ]
    },
    facilities: ['Library', 'Sports Complex', 'Hostel', 'Labs', 'Hill Campus'],
    courses: ['B.Tech', 'M.Tech', 'PhD'],
    established: 1961,
    accreditation: 'NAAC A+'
  },
  {
    id: '16',
    name: 'National Institute of Technology Silchar',
    shortName: 'NIT Silchar',
    location: 'Silchar',
    state: 'Assam',
    type: 'NIT',
    ranking: 20,
    fees: 145000,
    avgPackage: 750000,
    highestPackage: 8000000,
    placementRate: 82,
    topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'HCL'],
    cutoffs: {
      jee: [
        { year: 2024, general: 12000, obc: 18000, sc: 35000, st: 25000, ews: 14500 },
        { year: 2023, general: 12600, obc: 18900, sc: 36500, st: 26050, ews: 15225 },
        { year: 2022, general: 11500, obc: 17265, sc: 34125, st: 24300, ews: 13905 },
        { year: 2021, general: 13300, obc: 19950, sc: 38280, st: 27355, ews: 16062 },
        { year: 2020, general: 14068, obc: 21102, sc: 40195, st: 28730, ews: 16990 },
        { year: 2019, general: 14882, obc: 22323, sc: 42235, st: 30190, ews: 17972 },
        { year: 2018, general: 15748, obc: 23622, sc: 44470, st: 31795 },
        { year: 2017, general: 16672, obc: 25008, sc: 46895, st: 33542 },
        { year: 2016, general: 17662, obc: 26493, sc: 49480, st: 35400 },
        { year: 2015, general: 18722, obc: 28083, sc: 52230, st: 37375 }
      ]
    },
    facilities: ['Library', 'Sports Complex', 'Hostel', 'Labs'],
    courses: ['B.Tech', 'M.Tech', 'PhD'],
    established: 1967,
    accreditation: 'NAAC A'
  },

  // ============ IIITs ============
  {
    id: '17',
    name: 'IIIT Hyderabad',
    shortName: 'IIIT-H',
    location: 'Hyderabad',
    state: 'Telangana',
    type: 'IIIT',
    ranking: 16,
    fees: 320000,
    avgPackage: 1800000,
    highestPackage: 22000000,
    placementRate: 95,
    topRecruiters: ['Google', 'Amazon', 'Microsoft', 'Uber', 'Flipkart'],
    cutoffs: {
      jee: [
        { year: 2024, general: 1800, obc: 3500, sc: 9000, st: 6000, ews: 2400 },
        { year: 2023, general: 1890, obc: 3675, sc: 9385, st: 6252, ews: 2520 },
        { year: 2022, general: 1725, obc: 3358, sc: 8775, st: 5830, ews: 2302 },
        { year: 2021, general: 1995, obc: 3878, sc: 9840, st: 6568, ews: 2660 },
        { year: 2020, general: 2110, obc: 4102, sc: 10335, st: 6900, ews: 2812 },
        { year: 2019, general: 2232, obc: 4340, sc: 10865, st: 7255, ews: 2975 },
        { year: 2018, general: 2362, obc: 4595, sc: 11440, st: 7642 },
        { year: 2017, general: 2502, obc: 4868, sc: 12060, st: 8062 },
        { year: 2016, general: 2655, obc: 5165, sc: 12725, st: 8510 },
        { year: 2015, general: 2818, obc: 5482, sc: 13430, st: 8985 }
      ]
    },
    facilities: ['Library', 'Innovation Center', 'Hostel', 'Labs', 'Research Wing'],
    courses: ['B.Tech', 'M.Tech', 'PhD'],
    established: 1998,
    accreditation: 'NAAC A'
  },
  {
    id: '18',
    name: 'IIIT Allahabad',
    shortName: 'IIIT-A',
    location: 'Prayagraj',
    state: 'Uttar Pradesh',
    type: 'IIIT',
    ranking: 22,
    fees: 280000,
    avgPackage: 1500000,
    highestPackage: 18000000,
    placementRate: 92,
    topRecruiters: ['Google', 'Amazon', 'Microsoft', 'Goldman Sachs', 'Flipkart'],
    cutoffs: {
      jee: [
        { year: 2024, general: 3500, obc: 6000, sc: 14000, st: 9500, ews: 4500 },
        { year: 2023, general: 3675, obc: 6300, sc: 14600, st: 9900, ews: 4725 },
        { year: 2022, general: 3358, obc: 5758, sc: 13650, st: 9228, ews: 4318 },
        { year: 2021, general: 3878, obc: 6650, sc: 15315, st: 10395, ews: 4985 },
        { year: 2020, general: 4102, obc: 7035, sc: 16082, st: 10920, ews: 5272 },
        { year: 2019, general: 4340, obc: 7442, sc: 16900, st: 11480, ews: 5578 },
        { year: 2018, general: 4595, obc: 7880, sc: 17800, st: 12095 },
        { year: 2017, general: 4868, obc: 8348, sc: 18760, st: 12755 },
        { year: 2016, general: 5165, obc: 8855, sc: 19790, st: 13460 },
        { year: 2015, general: 5478, obc: 9392, sc: 20890, st: 14210 }
      ]
    },
    facilities: ['Library', 'Sports Complex', 'Hostel', 'Labs', 'Incubation Center'],
    courses: ['B.Tech', 'M.Tech', 'PhD'],
    established: 1999,
    accreditation: 'NAAC A'
  },
  {
    id: '19',
    name: 'IIIT Delhi',
    shortName: 'IIIT-D',
    location: 'New Delhi',
    state: 'Delhi',
    type: 'IIIT',
    ranking: 18,
    fees: 350000,
    avgPackage: 1600000,
    highestPackage: 20000000,
    placementRate: 94,
    topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Adobe', 'Samsung'],
    cutoffs: {
      jee: [
        { year: 2024, general: 2800, obc: 4800, sc: 12000, st: 8000, ews: 3600 },
        { year: 2023, general: 2940, obc: 5040, sc: 12510, st: 8340, ews: 3780 },
        { year: 2022, general: 2685, obc: 4605, sc: 11700, st: 7770, ews: 3452 },
        { year: 2021, general: 3102, obc: 5320, sc: 13115, st: 8755, ews: 3988 },
        { year: 2020, general: 3280, obc: 5625, sc: 13772, st: 9198, ews: 4218 },
        { year: 2019, general: 3470, obc: 5952, sc: 14478, st: 9670, ews: 4462 },
        { year: 2018, general: 3672, obc: 6302, sc: 15240, st: 10192 },
        { year: 2017, general: 3890, obc: 6675, sc: 16072, st: 10752 },
        { year: 2016, general: 4125, obc: 7078, sc: 16970, st: 11355 },
        { year: 2015, general: 4375, obc: 7508, sc: 17915, st: 11990 }
      ]
    },
    facilities: ['Library', 'Innovation Center', 'Hostel', 'Labs', 'Research Wing'],
    courses: ['B.Tech', 'M.Tech', 'PhD'],
    established: 2008,
    accreditation: 'NAAC A'
  },

  // ============ Private Colleges ============
  {
    id: '20',
    name: 'Birla Institute of Technology and Science',
    shortName: 'BITS Pilani',
    location: 'Pilani',
    state: 'Rajasthan',
    type: 'Private',
    ranking: 17,
    fees: 550000,
    avgPackage: 1600000,
    highestPackage: 18000000,
    placementRate: 93,
    topRecruiters: ['Google', 'Microsoft', 'Goldman Sachs', 'DE Shaw', 'Sprinklr'],
    cutoffs: {
      jee: [
        { year: 2024, general: 2200, obc: 4000, sc: 10000, st: 7000, ews: 2900 },
        { year: 2023, general: 2310, obc: 4200, sc: 10425, st: 7295, ews: 3045 },
        { year: 2022, general: 2110, obc: 3838, sc: 9750, st: 6800, ews: 2782 },
        { year: 2021, general: 2438, obc: 4432, sc: 10930, st: 7660, ews: 3215 },
        { year: 2020, general: 2578, obc: 4688, sc: 11478, st: 8045, ews: 3400 },
        { year: 2019, general: 2728, obc: 4960, sc: 12065, st: 8460, ews: 3595 },
        { year: 2018, general: 2888, obc: 5252, sc: 12705, st: 8920 },
        { year: 2017, general: 3058, obc: 5562, sc: 13400, st: 9410 },
        { year: 2016, general: 3242, obc: 5898, sc: 14140, st: 9932 },
        { year: 2015, general: 3438, obc: 6258, sc: 14925, st: 10485 }
      ]
    },
    facilities: ['Library', 'Sports', 'Hostel', 'Labs', 'Innovation Hub', 'Entrepreneurship Cell'],
    courses: ['B.Tech', 'M.Tech', 'MBA', 'PhD'],
    established: 1964,
    accreditation: 'NAAC A'
  },
  {
    id: '21',
    name: 'VIT Vellore',
    shortName: 'VIT',
    location: 'Vellore',
    state: 'Tamil Nadu',
    type: 'Private',
    ranking: 25,
    fees: 450000,
    avgPackage: 700000,
    highestPackage: 12000000,
    placementRate: 88,
    topRecruiters: ['TCS', 'Wipro', 'Cognizant', 'Infosys', 'Capgemini'],
    cutoffs: {
      jee: [
        { year: 2024, general: 8000, obc: 12000, sc: 25000, st: 18000, ews: 10000 },
        { year: 2023, general: 8400, obc: 12600, sc: 26062, st: 18765, ews: 10500 },
        { year: 2022, general: 7675, obc: 11512, sc: 24375, st: 17490, ews: 9590 },
        { year: 2021, general: 8862, obc: 13293, sc: 27330, st: 19705, ews: 11077 },
        { year: 2020, general: 9372, obc: 14058, sc: 28698, st: 20695, ews: 11715 },
        { year: 2019, general: 9918, obc: 14877, sc: 30160, st: 21752, ews: 12398 },
        { year: 2018, general: 10498, obc: 15747, sc: 31770, st: 22915 },
        { year: 2017, general: 11118, obc: 16677, sc: 33515, st: 24175 },
        { year: 2016, general: 11785, obc: 17677, sc: 35385, st: 25528 },
        { year: 2015, general: 12498, obc: 18747, sc: 37360, st: 26955 }
      ]
    },
    facilities: ['Library', 'Sports', 'Hostel', 'Labs', 'Cafeteria', 'Tech Park'],
    courses: ['B.Tech', 'M.Tech', 'MBA'],
    established: 1984,
    accreditation: 'NAAC A++'
  },
  {
    id: '22',
    name: 'SRM Institute of Science and Technology',
    shortName: 'SRM Chennai',
    location: 'Chennai',
    state: 'Tamil Nadu',
    type: 'Private',
    ranking: 30,
    fees: 400000,
    avgPackage: 600000,
    highestPackage: 10000000,
    placementRate: 85,
    topRecruiters: ['TCS', 'Wipro', 'Cognizant', 'Infosys', 'HCL'],
    cutoffs: {
      jee: [
        { year: 2024, general: 15000, obc: 22000, sc: 40000, st: 30000, ews: 18000 },
        { year: 2023, general: 15750, obc: 23100, sc: 41700, st: 31275, ews: 18900 },
        { year: 2022, general: 14387, obc: 21105, sc: 39000, st: 29155, ews: 17265 },
        { year: 2021, general: 16620, obc: 24385, sc: 43730, st: 32840, ews: 19945 },
        { year: 2020, general: 17580, obc: 25795, sc: 45920, st: 34490, ews: 21098 },
        { year: 2019, general: 18600, obc: 27290, sc: 48250, st: 36240, ews: 22320 },
        { year: 2018, general: 19682, obc: 28882, sc: 50820, st: 38175 },
        { year: 2017, general: 20838, obc: 30580, sc: 53615, st: 40275 },
        { year: 2016, general: 22078, obc: 32398, sc: 56580, st: 42510 },
        { year: 2015, general: 23408, obc: 34350, sc: 59720, st: 44878 }
      ]
    },
    facilities: ['Library', 'Sports', 'Hostel', 'Labs', 'Cafeteria'],
    courses: ['B.Tech', 'M.Tech', 'MBA'],
    established: 1985,
    accreditation: 'NAAC A++'
  },
  {
    id: '23',
    name: 'Manipal Institute of Technology',
    shortName: 'MIT Manipal',
    location: 'Manipal',
    state: 'Karnataka',
    type: 'Private',
    ranking: 28,
    fees: 480000,
    avgPackage: 650000,
    highestPackage: 11000000,
    placementRate: 86,
    topRecruiters: ['TCS', 'Wipro', 'Cognizant', 'Oracle', 'SAP'],
    cutoffs: {
      jee: [
        { year: 2024, general: 12000, obc: 18000, sc: 35000, st: 25000, ews: 14500 },
        { year: 2023, general: 12600, obc: 18900, sc: 36500, st: 26062, ews: 15225 },
        { year: 2022, general: 11512, obc: 17265, sc: 34125, st: 24300, ews: 13905 },
        { year: 2021, general: 13298, obc: 19945, sc: 38290, st: 27375, ews: 16062 },
        { year: 2020, general: 14068, obc: 21102, sc: 40208, st: 28750, ews: 16990 },
        { year: 2019, general: 14882, obc: 22323, sc: 42252, st: 30212, ews: 17972 },
        { year: 2018, general: 15748, obc: 23622, sc: 44495, st: 31835 },
        { year: 2017, general: 16672, obc: 25008, sc: 46940, st: 33590 },
        { year: 2016, general: 17662, obc: 26493, sc: 49525, st: 35450 },
        { year: 2015, general: 18722, obc: 28083, sc: 52285, st: 37428 }
      ]
    },
    facilities: ['Library', 'Sports', 'Hostel', 'Labs', 'Hospital', 'Beach Access'],
    courses: ['B.Tech', 'M.Tech', 'MBA'],
    established: 1957,
    accreditation: 'NAAC A++'
  },

  // ============ Medical Colleges ============
  {
    id: '24',
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
      neet: [
        { year: 2024, general: 50, obc: 150, sc: 800, st: 500, ews: 100 },
        { year: 2023, general: 54, obc: 162, sc: 856, st: 535, ews: 108 },
        { year: 2022, general: 48, obc: 144, sc: 768, st: 480, ews: 96 },
        { year: 2021, general: 58, obc: 174, sc: 916, st: 573, ews: 116 },
        { year: 2020, general: 62, obc: 186, sc: 980, st: 613, ews: 124 },
        { year: 2019, general: 66, obc: 199, sc: 1049, st: 656, ews: 133 },
        { year: 2018, general: 71, obc: 213, sc: 1122, st: 702 },
        { year: 2017, general: 76, obc: 228, sc: 1201, st: 751 },
        { year: 2016, general: 81, obc: 244, sc: 1285, st: 803 },
        { year: 2015, general: 87, obc: 261, sc: 1375, st: 859 }
      ]
    },
    facilities: ['Hospital', 'Research Labs', 'Hostel', 'Library', 'Trauma Center'],
    courses: ['MBBS', 'MD', 'MS', 'PhD', 'DNB'],
    established: 1956,
    accreditation: 'NAAC A++'
  },
  {
    id: '25',
    name: 'AIIMS Jodhpur',
    shortName: 'AIIMS Jodhpur',
    location: 'Jodhpur',
    state: 'Rajasthan',
    type: 'Medical',
    ranking: 5,
    fees: 15000,
    avgPackage: 1200000,
    highestPackage: 4000000,
    placementRate: 98,
    topRecruiters: ['Government Hospitals', 'Apollo', 'Fortis', 'Max Healthcare'],
    cutoffs: {
      neet: [
        { year: 2024, general: 800, obc: 1500, sc: 4000, st: 2800, ews: 1100 },
        { year: 2023, general: 856, obc: 1605, sc: 4280, st: 2996, ews: 1177 },
        { year: 2022, general: 768, obc: 1440, sc: 3840, st: 2688, ews: 1056 },
        { year: 2021, general: 916, obc: 1718, sc: 4580, st: 3206, ews: 1259 },
        { year: 2020, general: 980, obc: 1838, sc: 4900, st: 3430, ews: 1347 },
        { year: 2019, general: 1049, obc: 1966, sc: 5243, st: 3670, ews: 1441 },
        { year: 2018, general: 1122, obc: 2104, sc: 5610, st: 3927 },
        { year: 2017, general: 1201, obc: 2251, sc: 6003, st: 4202 },
        { year: 2016, general: 1285, obc: 2409, sc: 6423, st: 4496 },
        { year: 2015, general: 1375, obc: 2578, sc: 6873, st: 4811 }
      ]
    },
    facilities: ['Hospital', 'Research Labs', 'Hostel', 'Library'],
    courses: ['MBBS', 'MD', 'MS'],
    established: 2012,
    accreditation: 'NAAC A+'
  },
  {
    id: '26',
    name: 'Maulana Azad Medical College',
    shortName: 'MAMC Delhi',
    location: 'New Delhi',
    state: 'Delhi',
    type: 'Medical',
    ranking: 3,
    fees: 25000,
    avgPackage: 1300000,
    highestPackage: 4500000,
    placementRate: 99,
    topRecruiters: ['Government Hospitals', 'Apollo', 'Fortis', 'Medanta'],
    cutoffs: {
      neet: [
        { year: 2024, general: 150, obc: 350, sc: 1200, st: 800, ews: 220 },
        { year: 2023, general: 161, obc: 375, sc: 1284, st: 856, ews: 235 },
        { year: 2022, general: 144, obc: 336, sc: 1152, st: 768, ews: 211 },
        { year: 2021, general: 172, obc: 401, sc: 1374, st: 916, ews: 252 },
        { year: 2020, general: 184, obc: 429, sc: 1470, st: 980, ews: 270 },
        { year: 2019, general: 197, obc: 459, sc: 1573, st: 1049, ews: 289 },
        { year: 2018, general: 211, obc: 491, sc: 1683, st: 1122 },
        { year: 2017, general: 226, obc: 526, sc: 1801, st: 1201 },
        { year: 2016, general: 242, obc: 563, sc: 1927, st: 1285 },
        { year: 2015, general: 259, obc: 602, sc: 2062, st: 1375 }
      ]
    },
    facilities: ['Hospital', 'Research Labs', 'Hostel', 'Library'],
    courses: ['MBBS', 'MD', 'MS'],
    established: 1958,
    accreditation: 'NAAC A+'
  },
  {
    id: '27',
    name: 'Christian Medical College',
    shortName: 'CMC Vellore',
    location: 'Vellore',
    state: 'Tamil Nadu',
    type: 'Medical',
    ranking: 4,
    fees: 35000,
    avgPackage: 1100000,
    highestPackage: 3800000,
    placementRate: 97,
    topRecruiters: ['CMC Hospital', 'Government Hospitals', 'Apollo', 'Manipal Hospitals'],
    cutoffs: {
      neet: [
        { year: 2024, general: 400, obc: 800, sc: 2500, st: 1700, ews: 550 },
        { year: 2023, general: 428, obc: 856, sc: 2675, st: 1819, ews: 589 },
        { year: 2022, general: 384, obc: 768, sc: 2400, st: 1632, ews: 528 },
        { year: 2021, general: 458, obc: 916, sc: 2863, st: 1946, ews: 630 },
        { year: 2020, general: 490, obc: 980, sc: 3063, st: 2082, ews: 674 },
        { year: 2019, general: 524, obc: 1049, sc: 3277, st: 2228, ews: 721 },
        { year: 2018, general: 561, obc: 1122, sc: 3506, st: 2384 },
        { year: 2017, general: 600, obc: 1201, sc: 3752, st: 2551 },
        { year: 2016, general: 642, obc: 1285, sc: 4014, st: 2729 },
        { year: 2015, general: 687, obc: 1375, sc: 4295, st: 2920 }
      ]
    },
    facilities: ['Hospital', 'Research Labs', 'Hostel', 'Library', 'Chapel'],
    courses: ['MBBS', 'MD', 'MS', 'Allied Health'],
    established: 1900,
    accreditation: 'NAAC A++'
  },
  {
    id: '28',
    name: 'Armed Forces Medical College',
    shortName: 'AFMC Pune',
    location: 'Pune',
    state: 'Maharashtra',
    type: 'Medical',
    ranking: 6,
    fees: 8000,
    avgPackage: 1400000,
    highestPackage: 4200000,
    placementRate: 100,
    topRecruiters: ['Indian Armed Forces', 'Military Hospitals'],
    cutoffs: {
      neet: [
        { year: 2024, general: 250, obc: 500, sc: 1500, st: 1000, ews: 350 },
        { year: 2023, general: 268, obc: 535, sc: 1605, st: 1070, ews: 375 },
        { year: 2022, general: 240, obc: 480, sc: 1440, st: 960, ews: 336 },
        { year: 2021, general: 286, obc: 573, sc: 1718, st: 1145, ews: 401 },
        { year: 2020, general: 306, obc: 613, sc: 1838, st: 1225, ews: 429 },
        { year: 2019, general: 328, obc: 656, sc: 1967, st: 1311, ews: 459 },
        { year: 2018, general: 351, obc: 702, sc: 2104, st: 1403 },
        { year: 2017, general: 375, obc: 751, sc: 2252, st: 1501 },
        { year: 2016, general: 402, obc: 803, sc: 2409, st: 1606 },
        { year: 2015, general: 430, obc: 859, sc: 2578, st: 1719 }
      ]
    },
    facilities: ['Hospital', 'Military Training', 'Hostel', 'Library', 'Sports Complex'],
    courses: ['MBBS', 'MD', 'MS'],
    established: 1948,
    accreditation: 'NAAC A++'
  },
  {
    id: '29',
    name: 'King George\'s Medical University',
    shortName: 'KGMU Lucknow',
    location: 'Lucknow',
    state: 'Uttar Pradesh',
    type: 'Medical',
    ranking: 8,
    fees: 45000,
    avgPackage: 900000,
    highestPackage: 3200000,
    placementRate: 95,
    topRecruiters: ['Government Hospitals', 'Apollo', 'Medanta', 'Private Clinics'],
    cutoffs: {
      neet: [
        { year: 2024, general: 600, obc: 1100, sc: 3200, st: 2200, ews: 800 },
        { year: 2023, general: 642, obc: 1177, sc: 3424, st: 2354, ews: 856 },
        { year: 2022, general: 576, obc: 1056, sc: 3072, st: 2112, ews: 768 },
        { year: 2021, general: 687, obc: 1259, sc: 3664, st: 2519, ews: 916 },
        { year: 2020, general: 735, obc: 1347, sc: 3920, st: 2695, ews: 980 },
        { year: 2019, general: 786, obc: 1441, sc: 4194, st: 2883, ews: 1049 },
        { year: 2018, general: 841, obc: 1542, sc: 4488, st: 3085 },
        { year: 2017, general: 900, obc: 1650, sc: 4802, st: 3301 },
        { year: 2016, general: 963, obc: 1766, sc: 5138, st: 3532 },
        { year: 2015, general: 1030, obc: 1889, sc: 5498, st: 3779 }
      ]
    },
    facilities: ['Hospital', 'Research Labs', 'Hostel', 'Library'],
    courses: ['MBBS', 'MD', 'MS', 'BDS'],
    established: 1911,
    accreditation: 'NAAC A'
  },

  // ============ Central Universities ============
  {
    id: '30',
    name: 'Delhi University',
    shortName: 'DU',
    location: 'New Delhi',
    state: 'Delhi',
    type: 'Central',
    ranking: 20,
    fees: 50000,
    avgPackage: 800000,
    highestPackage: 3500000,
    placementRate: 85,
    topRecruiters: ['Deloitte', 'EY', 'KPMG', 'PwC', 'HUL'],
    cutoffs: {
      cuet: [
        { year: 2024, general: 750, obc: 680, sc: 550, st: 500, ews: 720 },
        { year: 2023, general: 762, obc: 691, sc: 559, st: 508, ews: 731 },
        { year: 2022, general: 738, obc: 669, sc: 541, st: 492, ews: 709 },
        { year: 2021, general: 774, obc: 702, sc: 568, st: 516, ews: 743 }
      ]
    },
    facilities: ['Library', 'Sports', 'Hostels', 'Cafeteria', 'Auditorium'],
    courses: ['BA', 'B.Com', 'B.Sc', 'MA', 'M.Com'],
    established: 1922,
    accreditation: 'NAAC A+'
  },
  {
    id: '31',
    name: 'Jawaharlal Nehru University',
    shortName: 'JNU',
    location: 'New Delhi',
    state: 'Delhi',
    type: 'Central',
    ranking: 22,
    fees: 35000,
    avgPackage: 700000,
    highestPackage: 2800000,
    placementRate: 80,
    topRecruiters: ['Think Tanks', 'NGOs', 'Government', 'Media Houses', 'Research Institutes'],
    cutoffs: {
      cuet: [
        { year: 2024, general: 720, obc: 650, sc: 520, st: 470, ews: 690 },
        { year: 2023, general: 731, obc: 660, sc: 528, st: 477, ews: 701 },
        { year: 2022, general: 709, obc: 640, sc: 512, st: 463, ews: 679 },
        { year: 2021, general: 743, obc: 671, sc: 536, st: 485, ews: 712 }
      ]
    },
    facilities: ['Library', 'Sports', 'Hostels', 'Cafeteria', 'Research Centers'],
    courses: ['BA', 'MA', 'M.Phil', 'PhD'],
    established: 1969,
    accreditation: 'NAAC A++'
  },
  {
    id: '32',
    name: 'Banaras Hindu University',
    shortName: 'BHU',
    location: 'Varanasi',
    state: 'Uttar Pradesh',
    type: 'Central',
    ranking: 18,
    fees: 40000,
    avgPackage: 650000,
    highestPackage: 2500000,
    placementRate: 78,
    topRecruiters: ['TCS', 'Infosys', 'Government', 'Banks', 'Teaching'],
    cutoffs: {
      cuet: [
        { year: 2024, general: 680, obc: 610, sc: 490, st: 440, ews: 650 },
        { year: 2023, general: 691, obc: 619, sc: 498, st: 447, ews: 660 },
        { year: 2022, general: 669, obc: 601, sc: 482, st: 433, ews: 640 },
        { year: 2021, general: 702, obc: 628, sc: 506, st: 454, ews: 671 }
      ]
    },
    facilities: ['Library', 'Sports', 'Hostels', 'Temple', 'Hospital'],
    courses: ['BA', 'B.Com', 'B.Sc', 'B.Tech', 'MBBS', 'MA'],
    established: 1916,
    accreditation: 'NAAC A+'
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
  },
  {
    id: '6',
    name: 'INSPIRE Scholarship',
    provider: 'Department of Science & Technology',
    amount: 80000,
    eligibility: 'Top 1% in Class 12 Board Exams',
    deadline: '2025-09-30',
    category: 'merit',
    examType: ['jee', 'neet']
  },
  {
    id: '7',
    name: 'Central Sector Scholarship',
    provider: 'Ministry of Education',
    amount: 20000,
    eligibility: 'Top 20% of board exam + Family income below 8 LPA',
    deadline: '2025-11-15',
    category: 'merit',
    examType: ['jee', 'neet', 'cuet']
  },
  {
    id: '8',
    name: 'Sitaram Jindal Foundation Scholarship',
    provider: 'Sitaram Jindal Foundation',
    amount: 24000,
    eligibility: 'Family income below 2 LPA + 60%+ marks',
    deadline: '2025-10-15',
    category: 'need',
    examType: ['jee', 'neet']
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
  },
  {
    id: '6',
    name: 'Elite Boys Hostel',
    type: 'Hostel',
    location: 'Kanpur',
    nearbyColleges: ['IIT Kanpur'],
    distance: 1.0,
    rent: 10000,
    amenities: ['WiFi', 'AC', 'Meals', 'Laundry', 'Gym'],
    gender: 'male',
    rating: 4.4,
    reviews: 92
  },
  {
    id: '7',
    name: 'Vidya Niwas PG',
    type: 'PG',
    location: 'Kharagpur',
    nearbyColleges: ['IIT Kharagpur'],
    distance: 0.8,
    rent: 7500,
    amenities: ['WiFi', 'Meals', 'Laundry', 'Security'],
    gender: 'unisex',
    rating: 4.1,
    reviews: 67
  },
  {
    id: '8',
    name: 'Roorkee Student Residency',
    type: 'Hostel',
    location: 'Roorkee',
    nearbyColleges: ['IIT Roorkee'],
    distance: 0.6,
    rent: 8500,
    amenities: ['WiFi', 'Meals', 'Library', 'Sports'],
    gender: 'unisex',
    rating: 4.3,
    reviews: 83
  }
];

export const placementData = {
  avgPackages: [
    { year: '2015', IIT: 12, NIT: 6, Private: 4 },
    { year: '2016', IIT: 13, NIT: 6.5, Private: 4.2 },
    { year: '2017', IIT: 14, NIT: 7, Private: 4.5 },
    { year: '2018', IIT: 15, NIT: 7.5, Private: 5 },
    { year: '2019', IIT: 16, NIT: 8, Private: 5.5 },
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
    { name: 'Flipkart', offers: 280, avgPackage: 32 },
    { name: 'Uber', offers: 150, avgPackage: 48 },
    { name: 'Adobe', offers: 200, avgPackage: 35 },
    { name: 'Samsung', offers: 180, avgPackage: 28 }
  ]
};
