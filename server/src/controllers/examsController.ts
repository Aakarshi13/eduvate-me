import { Request, Response } from 'express';
import { db } from '../config/database';

export const getAllExams = async (req: Request, res: Response) => {
  try {
    const { type } = req.query;
    
    let query = 'SELECT * FROM exams WHERE 1=1';
    const params: any[] = [];

    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }

    query += ' ORDER BY date ASC';

    const exams = db.prepare(query).all(...params);
    res.json({ exams });
  } catch (error) {
    console.error('Get exams error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getExamById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const exam = db.prepare('SELECT * FROM exams WHERE id = ?').get(id);

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    res.json({ exam });
  } catch (error) {
    console.error('Get exam error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
