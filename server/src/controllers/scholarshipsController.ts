import { Request, Response } from 'express';
import { db } from '../config/database';

export const getAllScholarships = async (req: Request, res: Response) => {
  try {
    const { category, examType } = req.query;
    
    let query = 'SELECT * FROM scholarships WHERE 1=1';
    const params: any[] = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    if (examType) {
      query += ' AND exam_types LIKE ?';
      params.push(`%${examType}%`);
    }

    query += ' ORDER BY amount DESC';

    const scholarships = db.prepare(query).all(...params);

    // Parse JSON fields
    const parsedScholarships = scholarships.map((scholarship: any) => ({
      ...scholarship,
      exam_types: scholarship.exam_types ? JSON.parse(scholarship.exam_types) : [],
    }));

    res.json({ scholarships: parsedScholarships });
  } catch (error) {
    console.error('Get scholarships error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getScholarshipById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const scholarship = db
      .prepare('SELECT * FROM scholarships WHERE id = ?')
      .get(id) as any;

    if (!scholarship) {
      return res.status(404).json({ error: 'Scholarship not found' });
    }

    // Parse JSON fields
    const parsedScholarship = {
      ...scholarship,
      exam_types: scholarship.exam_types ? JSON.parse(scholarship.exam_types) : [],
    };

    res.json({ scholarship: parsedScholarship });
  } catch (error) {
    console.error('Get scholarship error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
