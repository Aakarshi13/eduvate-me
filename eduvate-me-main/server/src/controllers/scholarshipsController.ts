import { Request, Response } from 'express';
import { Scholarship } from '../models/index';

export const getAllScholarships = async (req: Request, res: Response) => {
  try {
    const { category, examType } = req.query;
    
    let query = Scholarship.find();

    if (category) {
      query = query.where('category').equals(category);
    }

    if (examType) {
      query = query.where('examTypes').in([examType]);
    }

    const scholarships = await query.sort({ amount: -1 });

    console.log('🎓 Fetching scholarships', category ? `(category: ${category})` : '', examType ? `(exam: ${examType})` : '');
    res.json({ scholarships });
  } catch (error) {
    console.error('❌ Get scholarships error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getScholarshipById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const scholarship = await Scholarship.findById(id);

    if (!scholarship) {
      console.log(`❌ Scholarship not found with ID: ${id}`);
      return res.status(404).json({ error: 'Scholarship not found' });
    }

    console.log(`🎓 Fetched scholarship: ${scholarship.name}`);
    res.json({ scholarship });
  } catch (error) {
    console.error('❌ Get scholarship error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
