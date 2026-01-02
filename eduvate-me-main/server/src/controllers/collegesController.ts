import { Request, Response } from 'express';
import { College, Cutoff } from '../models/index';
import { JEEScraper } from '../services/scraper/jeeScraper';
import { NEETScraper } from '../services/scraper/neetScraper';
import { CUETScraper } from '../services/scraper/cuetScraper';

// Initialize scrapers
const jeeScraper = new JEEScraper();
const neetScraper = new NEETScraper();
const cuetScraper = new CUETScraper();

export const getAllColleges = async (req: Request, res: Response) => {
  try {
    const { type, state, search } = req.query;
    
    let query: any = {};

    if (type) {
      query.type = type;
    }

    if (state) {
      query.state = state;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { shortName: { $regex: search, $options: 'i' } }
      ];
    }

    const colleges = await College.find(query).sort({ ranking: 1 });

    res.json({ colleges });
  } catch (error) {
    console.error('Get colleges error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCollegeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const college = await College.findById(id);

    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }

    // Get cutoffs for this college
    const cutoffs = await Cutoff.find({ collegeId: id }).sort({ year: -1 });

    // Group cutoffs by exam type
    const groupedCutoffs: any = {};
    cutoffs.forEach((cutoff) => {
      if (!groupedCutoffs[cutoff.examType]) {
        groupedCutoffs[cutoff.examType] = [];
      }
      groupedCutoffs[cutoff.examType].push({
        year: cutoff.year,
        general: cutoff.general,
        obc: cutoff.obc,
        sc: cutoff.sc,
        st: cutoff.st,
        ews: cutoff.ews,
      });
    });

    const collegeData = {
      ...college.toObject(),
      cutoffs: groupedCutoffs,
    };

    res.json({ college: collegeData });
  } catch (error) {
    console.error('Get college error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const predictColleges = async (req: Request, res: Response) => {
  try {
    const { rank, category, examType } = req.body;

    console.log(`Prediction request: rank=${rank}, category=${category}, examType=${examType}`);

    if (!rank || !category || !examType) {
      return res.status(400).json({ error: 'Rank, category, and exam type are required' });
    }

    // Validate rank is a reasonable number
    if (rank < 1 || rank > 1000000) {
      return res.status(400).json({ error: 'Invalid rank provided' });
    }

    // Get all colleges with their latest cutoffs
    const colleges = await College.find();
    
    const safe: any[] = [];
    const likely: any[] = [];
    const competitive: any[] = [];

    for (const college of colleges) {
      // Get latest cutoff for this college and exam type
      const cutoff = await Cutoff.findOne({ 
        collegeId: college._id, 
        examType 
      }).sort({ year: -1 });

      if (!cutoff) {
        continue;
      }

      // Get the cutoff value for the specific category, fallback to general if not available
      const cutoffValue = (cutoff as any)[category] || cutoff.general || 1000000;
      
      // Validate if the rank is realistic for this college type
      let isRealistic = true;
      if (examType === 'jee') {
        isRealistic = jeeScraper.isRankRealisticForCollege(rank, college.type);
      } else if (examType === 'neet') {
        isRealistic = neetScraper.isRankRealisticForCollege(rank, college.type);
      } else if (examType === 'cuet') {
        isRealistic = cuetScraper.isRankRealisticForCollege(rank, college.type);
      }
      
      // Skip unrealistic predictions
      if (!isRealistic) {
        continue;
      }
      
      // For category-based predictions, we adjust the comparison based on reservation benefits
      // Reservation categories typically have relaxed cutoffs compared to general category
      // So a candidate from a reserved category with a worse rank might still qualify
      if (category !== 'general') {
        // For reserved categories, we give some relaxation in comparison
        if (rank <= cutoffValue * 0.9) {
          safe.push(college);
        } else if (rank <= cutoffValue * 1.2) {
          likely.push(college);
        } else if (rank <= cutoffValue * 1.6) {
          competitive.push(college);
        }
      } else {
        // For general category, stricter comparison
        if (rank <= cutoffValue * 0.7) {
          safe.push(college);
        } else if (rank <= cutoffValue * 1.0) {
          likely.push(college);
        } else if (rank <= cutoffValue * 1.4) {
          competitive.push(college);
        }
      }
    }

    console.log(`Prediction complete: ${safe.length} safe, ${likely.length} likely, ${competitive.length} competitive`);

    res.json({
      results: {
        safe: safe.slice(0, 20),
        likely: likely.slice(0, 20),
        competitive: competitive.slice(0, 20),
      },
    });
  } catch (error) {
    console.error('Predict colleges error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to convert mock test scores to ranks for college prediction
export const predictCollegesFromMockScore = async (req: Request, res: Response) => {
  try {
    const { mockScore, maxScore, category, examType } = req.body;

    console.log(` Mock score prediction request: mockScore=${mockScore}, maxScore=${maxScore}, category=${category}, examType=${examType}`);

    if (!mockScore || !maxScore || !category || !examType) {
      return res.status(400).json({ error: 'Mock score, max score, category, and exam type are required' });
    }

    // Convert mock score to percentile
    const percentile = (mockScore / maxScore) * 100;
    
    // Convert percentile to rank approximation
    // This is a simplified conversion - in reality, this would depend on the actual number of test takers
    let rank;
    if (examType === 'jee') {
      // For JEE Main, assuming ~10 lakh candidates
      rank = Math.round((100 - percentile) * 10000 / 100);
    } else if (examType === 'neet') {
      // For NEET, assuming ~15 lakh candidates
      rank = Math.round((100 - percentile) * 15000 / 100);
    } else if (examType === 'cuet') {
      // For CUET, assuming ~5 lakh candidates
      rank = Math.round((100 - percentile) * 5000 / 100);
    } else {
      // Default assumption
      rank = Math.round((100 - percentile) * 10000 / 100);
    }

    console.log(`Converted mock score to rank: ${rank} (percentile: ${percentile})`);

    // Get all colleges with their latest cutoffs
    const colleges = await College.find();
    
    const safe: any[] = [];
    const likely: any[] = [];
    const competitive: any[] = [];

    for (const college of colleges) {
      // Get latest cutoff for this college and exam type
      const cutoff = await Cutoff.findOne({ 
        collegeId: college._id, 
        examType 
      }).sort({ year: -1 });

      if (!cutoff) {
        continue;
      }

      // Get the cutoff value for the specific category, fallback to general if not available
      const cutoffValue = (cutoff as any)[category] || cutoff.general || 1000000;
      
      // Validate if the rank is realistic for this college type
      let isRealistic = true;
      if (examType === 'jee') {
        isRealistic = jeeScraper.isRankRealisticForCollege(rank, college.type);
      } else if (examType === 'neet') {
        isRealistic = neetScraper.isRankRealisticForCollege(rank, college.type);
      } else if (examType === 'cuet') {
        isRealistic = cuetScraper.isRankRealisticForCollege(rank, college.type);
      }
      
      // Skip unrealistic predictions
      if (!isRealistic) {
        continue;
      }
      
      // For category-based predictions, we adjust the comparison based on reservation benefits
      // Reservation categories typically have relaxed cutoffs compared to general category
      // So a candidate from a reserved category with a worse rank might still qualify
      if (category !== 'general') {
        // For reserved categories, we give some relaxation in comparison
        if (rank <= cutoffValue * 0.9) {
          safe.push(college);
        } else if (rank <= cutoffValue * 1.2) {
          likely.push(college);
        } else if (rank <= cutoffValue * 1.6) {
          competitive.push(college);
        }
      } else {
        // For general category, stricter comparison
        if (rank <= cutoffValue * 0.7) {
          safe.push(college);
        } else if (rank <= cutoffValue * 1.0) {
          likely.push(college);
        } else if (rank <= cutoffValue * 1.4) {
          competitive.push(college);
        }
      }
    }

    console.log(`✅ Mock score prediction complete: ${safe.length} safe, ${likely.length} likely, ${competitive.length} competitive`);

    res.json({
      results: {
        safe: safe.slice(0, 20),
        likely: likely.slice(0, 20),
        competitive: competitive.slice(0, 20),
      },
      metadata: {
        mockScore,
        maxScore,
        percentile: percentile.toFixed(2),
        estimatedRank: rank
      }
    });
  } catch (error) {
    console.error('Predict colleges from mock score error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};