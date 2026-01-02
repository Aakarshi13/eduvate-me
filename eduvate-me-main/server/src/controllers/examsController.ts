import { Request, Response } from 'express';
import { Exam } from '../models/index';

export const getAllExams = async (req: Request, res: Response) => {
  try {
    const { type } = req.query;
    
    let query = Exam.find();
    
    if (type) {
      // Find exams that include this exam type
      query = query.where('examTypes').in([type]);
    }

    const exams = await query.sort({ dates: 1 });
    
    console.log(' Fetching exams', type ? `for type: ${type}` : '(all)');
    res.json({ exams });
  } catch (error) {
    console.error(' Get exams error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getExamById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const exam = await Exam.findById(id);

    if (!exam) {
      console.log(` Exam not found with ID: ${id}`);
      return res.status(404).json({ error: 'Exam not found' });
    }

    console.log(`Fetched exam: ${exam.name}`);
    res.json({ exam });
  } catch (error) {
    console.error(' Get exam error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
