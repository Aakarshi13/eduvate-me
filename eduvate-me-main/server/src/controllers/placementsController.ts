import { Request, Response } from 'express';
import { Placement, College } from '../models/index';

export const getPlacementStats = async (req: Request, res: Response) => {
  try {
    // Get latest year
    const latestPlacement = await Placement.findOne().sort({ year: -1 });
    const latestYear = latestPlacement?.year || new Date().getFullYear();

    // Get average packages by year and college type
    const avgPackages = await Placement.aggregate([
      {
        $group: {
          _id: { year: '$year', collegeType: '$collegeType' },
          avgPackage: { $avg: '$avgPackage' },
        },
      },
      { $sort: { '_id.year': 1 } },
    ]);

    // Group by year
    const packagesByYear: any = {};
    avgPackages.forEach((row: any) => {
      if (!packagesByYear[row._id.year]) {
        packagesByYear[row._id.year] = { year: row._id.year.toString() };
      }
      packagesByYear[row._id.year][row._id.collegeType] = Math.round(row.avgPackage / 100000);
    });

    // Get sector distribution
    const sectorDist = await Placement.aggregate([
      { $match: { year: latestYear } },
      {
        $group: {
          _id: '$sector',
          totalOffers: { $sum: '$offers' },
        },
      },
      { $sort: { totalOffers: -1 } },
    ]);

    const totalOffers = sectorDist.reduce((sum: number, row: any) => sum + row.totalOffers, 0);
    const sectorDistribution = sectorDist.map((row: any, index: number) => ({
      name: row._id,
      value: Math.round((row.totalOffers / totalOffers) * 100),
      color: ['hsl(234, 89%, 54%)', 'hsl(166, 76%, 42%)', 'hsl(38, 92%, 50%)', 'hsl(280, 70%, 50%)', 'hsl(0, 0%, 60%)'][index] || 'hsl(0, 0%, 60%)',
    }));

    // Get top recruiters
    const topRecruiters = await Placement.aggregate([
      { $match: { year: latestYear } },
      {
        $group: {
          _id: '$company',
          totalOffers: { $sum: '$offers' },
          avgPackage: { $avg: '$avgPackage' },
        },
      },
      { $sort: { totalOffers: -1 } },
      { $limit: 10 },
    ]);

    const topRecruitersData = topRecruiters.map((row: any) => ({
      name: row._id,
      offers: row.totalOffers,
      avgPackage: Math.round(row.avgPackage / 100000),
    }));

    console.log('📊 Fetched placement statistics');
    res.json({
      avgPackages: Object.values(packagesByYear),
      sectorDistribution,
      topRecruiters: topRecruitersData,
    });
  } catch (error) {
    console.error('❌ Get placement stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCollegePlacements = async (req: Request, res: Response) => {
  try {
    const { collegeId } = req.params;

    const placements = await Placement.find({ collegeId }).sort({ year: -1, offers: -1 });

    console.log(`📊 Fetched placements for college: ${collegeId}`);
    res.json({ placements });
  } catch (error) {
    console.error('❌ Get college placements error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
