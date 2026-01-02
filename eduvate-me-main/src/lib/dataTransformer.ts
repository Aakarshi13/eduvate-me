/**
 * Transform college data from backend (snake_case) to frontend (camelCase)
 */
export const transformCollege = (college: any) => {
  // Handle topRecruiters - could be array or need parsing
  let topRecruiters: string[] = [];
  if (college.topRecruiters && Array.isArray(college.topRecruiters)) {
    topRecruiters = college.topRecruiters;
  } else if (college.top_recruiters) {
    if (Array.isArray(college.top_recruiters)) {
      topRecruiters = college.top_recruiters;
    } else if (typeof college.top_recruiters === 'string') {
      try {
        topRecruiters = JSON.parse(college.top_recruiters);
      } catch {
        topRecruiters = [];
      }
    }
  }

  // Handle facilities
  let facilities: string[] = [];
  if (college.facilities) {
    if (Array.isArray(college.facilities)) {
      facilities = college.facilities;
    } else if (typeof college.facilities === 'string') {
      try {
        facilities = JSON.parse(college.facilities);
      } catch {
        facilities = [];
      }
    }
  }

  // Handle courses
  let courses: string[] = [];
  if (college.courses) {
    if (Array.isArray(college.courses)) {
      courses = college.courses;
    } else if (typeof college.courses === 'string') {
      try {
        courses = JSON.parse(college.courses);
      } catch {
        courses = [];
      }
    }
  }

  return {
    id: college.id,
    name: college.name,
    shortName: college.short_name || college.shortName,
    location: college.location,
    state: college.state,
    type: college.type,
    ranking: college.ranking,
    fees: college.fees,
    avgPackage: college.avg_package || college.avgPackage,
    highestPackage: college.highest_package || college.highestPackage,
    placementRate: college.placement_rate || college.placementRate,
    topRecruiters: topRecruiters,
    facilities: facilities,
    courses: courses,
    established: college.established,
    accreditation: college.accreditation,
    imageUrl: college.image_url || college.imageUrl,
    cutoffs: college.cutoffs || {},
  };
};

/**
 * Transform array of colleges
 */
export const transformColleges = (colleges: any[]) => {
  return colleges.map(transformCollege);
};

/**
 * Transform college results from prediction endpoint
 */
export const transformCollegeResults = (results: any) => {
  return {
    safe: transformColleges(results.safe || []),
    likely: transformColleges(results.likely || []),
    competitive: transformColleges(results.competitive || []),
    metadata: results.metadata || {},
  };
};
