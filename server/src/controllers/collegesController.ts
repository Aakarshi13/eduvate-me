import { Request, Response } from 'express';
import { db } from '../config/database';

export const getAllColleges = async (req: Request, res: Response) => {
  try {
    const { type, state, search } = req.query;
    
    let query = 'SELECT * FROM colleges WHERE 1=1';
    const params: any[] = [];

    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }

    if (state) {
      query += ' AND state = ?';
      params.push(state);
    }

    if (search) {
      query += ' AND (name LIKE ? OR short_name LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY ranking ASC';

    const colleges = db.prepare(query).all(...params);

    // Parse JSON fields
    const parsedColleges = colleges.map((college: any) => ({
      ...college,
      top_recruiters: college.top_recruiters ? JSON.parse(college.top_recruiters) : [],
      facilities: college.facilities ? JSON.parse(college.facilities) : [],
      courses: college.courses ? JSON.parse(college.courses) : [],
    }));

    res.json({ colleges: parsedColleges });
  } catch (error) {
    console.error('Get colleges error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCollegeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const college = db
      .prepare('SELECT * FROM colleges WHERE id = ?')
      .get(id) as any;

    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }

    // Get cutoffs for this college
    const cutoffs = db
      .prepare('SELECT * FROM cutoffs WHERE college_id = ? ORDER BY year DESC')
      .all(id);

    // Group cutoffs by exam type
    const groupedCutoffs: any = {};
    cutoffs.forEach((cutoff: any) => {
      if (!groupedCutoffs[cutoff.exam_type]) {
        groupedCutoffs[cutoff.exam_type] = [];
      }
      groupedCutoffs[cutoff.exam_type].push({
        year: cutoff.year,
        general: cutoff.general,
        obc: cutoff.obc,
        sc: cutoff.sc,
        st: cutoff.st,
        ews: cutoff.ews,
      });
    });

    // Parse JSON fields
    const parsedCollege = {
      ...college,
      top_recruiters: college.top_recruiters ? JSON.parse(college.top_recruiters) : [],
      facilities: college.facilities ? JSON.parse(college.facilities) : [],
      courses: college.courses ? JSON.parse(college.courses) : [],
      cutoffs: groupedCutoffs,
    };

    res.json({ college: parsedCollege });
  } catch (error) {
    console.error('Get college error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const predictColleges = async (req: Request, res: Response) => {
  try {
    const { rank, category, examType } = req.body;

    if (!rank || !category || !examType) {
      return res.status(400).json({ error: 'Rank, category, and exam type are required' });
    }

    // Category multipliers for adjusted rank calculation
    const categoryMultiplier: Record<string, number> = {
      general: 1,
      obc: 1.5,
      sc: 3,
      st: 2.5,
      ews: 1.2,
    };

    const adjustedRank = rank / (categoryMultiplier[category] || 1);

    // Get all colleges with cutoffs for the specified exam type
    const colleges = db
      .prepare(`
        SELECT DISTINCT c.*, cu.general, cu.obc, cu.sc, cu.st, cu.ews
        FROM colleges c
        JOIN cutoffs cu ON c.id = cu.college_id
        WHERE cu.exam_type = ? AND cu.year = (
          SELECT MAX(year) FROM cutoffs WHERE college_id = c.id AND exam_type = ?
        )
        ORDER BY c.ranking ASC
      `)
      .all(examType, examType);

    const safe: any[] = [];
    const likely: any[] = [];
    const competitive: any[] = [];

    colleges.forEach((college: any) => {
      const cutoff = (college as any)[category] || college.general;
      
      // Parse JSON fields
      const parsedCollege = {
        ...college,
        top_recruiters: college.top_recruiters ? JSON.parse(college.top_recruiters) : [],
        facilities: college.facilities ? JSON.parse(college.facilities) : [],
        courses: college.courses ? JSON.parse(college.courses) : [],
      };

      if (adjustedRank <= cutoff * 0.6) {
        safe.push(parsedCollege);
      } else if (adjustedRank <= cutoff * 1.0) {
        likely.push(parsedCollege);
      } else if (adjustedRank <= cutoff * 1.5) {
        competitive.push(parsedCollege);
      }
    });

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
