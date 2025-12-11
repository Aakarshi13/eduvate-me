import { Request, Response } from 'express';
import { db } from '../config/database';

export const getPlacementStats = async (req: Request, res: Response) => {
  try {
    // Get average packages by year and college type
    const avgPackages = db
      .prepare(`
        SELECT 
          p.year,
          c.type,
          AVG(p.avg_package) as avg_package
        FROM placements p
        JOIN colleges c ON p.college_id = c.id
        GROUP BY p.year, c.type
        ORDER BY p.year ASC
      `)
      .all();

    // Group by year
    const packagesByYear: any = {};
    avgPackages.forEach((row: any) => {
      if (!packagesByYear[row.year]) {
        packagesByYear[row.year] = { year: row.year.toString() };
      }
      packagesByYear[row.year][row.type] = Math.round(row.avg_package / 100000);
    });

    // Get sector distribution
    const sectorDist = db
      .prepare(`
        SELECT 
          sector,
          SUM(offers) as total_offers
        FROM placements
        WHERE year = (SELECT MAX(year) FROM placements)
        GROUP BY sector
        ORDER BY total_offers DESC
      `)
      .all();

    const totalOffers = sectorDist.reduce((sum: number, row: any) => sum + row.total_offers, 0);
    const sectorDistribution = sectorDist.map((row: any, index: number) => ({
      name: row.sector,
      value: Math.round((row.total_offers / totalOffers) * 100),
      color: ['hsl(234, 89%, 54%)', 'hsl(166, 76%, 42%)', 'hsl(38, 92%, 50%)', 'hsl(280, 70%, 50%)', 'hsl(0, 0%, 60%)'][index] || 'hsl(0, 0%, 60%)',
    }));

    // Get top recruiters
    const topRecruiters = db
      .prepare(`
        SELECT 
          company,
          SUM(offers) as total_offers,
          AVG(avg_package) as avg_package
        FROM placements
        WHERE year = (SELECT MAX(year) FROM placements)
        GROUP BY company
        ORDER BY total_offers DESC
        LIMIT 10
      `)
      .all();

    const topRecruitersData = topRecruiters.map((row: any) => ({
      name: row.company,
      offers: row.total_offers,
      avgPackage: Math.round(row.avg_package / 100000),
    }));

    res.json({
      avgPackages: Object.values(packagesByYear),
      sectorDistribution,
      topRecruiters: topRecruitersData,
    });
  } catch (error) {
    console.error('Get placement stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCollegePlacements = async (req: Request, res: Response) => {
  try {
    const { collegeId } = req.params;

    const placements = db
      .prepare(`
        SELECT * FROM placements
        WHERE college_id = ?
        ORDER BY year DESC, offers DESC
      `)
      .all(collegeId);

    res.json({ placements });
  } catch (error) {
    console.error('Get college placements error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
