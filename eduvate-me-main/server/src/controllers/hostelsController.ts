import { Request, Response } from 'express';
import { Hostel } from '../models/index';

export const getAllHostels = async (req: Request, res: Response) => {
  try {
    const { location, type, gender, maxRent } = req.query;
    
    let query = Hostel.find();

    if (location) {
      query = query.where('location').regex(new RegExp(location as string, 'i'));
    }

    if (type) {
      query = query.where('type').equals(type);
    }

    if (gender && gender !== 'unisex') {
      query = query.where('gender').in([gender, 'unisex']);
    }

    if (maxRent) {
      query = query.where('rent').lte(Number(maxRent));
    }

    const hostels = await query.sort({ rating: -1, rent: 1 });

    console.log('🏠 Fetching hostels', location ? `(location: ${location})` : '');
    res.json({ hostels });
  } catch (error) {
    console.error('❌ Get hostels error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getHostelById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const hostel = await Hostel.findById(id);

    if (!hostel) {
      console.log(`❌ Hostel not found with ID: ${id}`);
      return res.status(404).json({ error: 'Hostel not found' });
    }

    console.log(`🏠 Fetched hostel: ${hostel.name}`);
    res.json({ hostel });
  } catch (error) {
    console.error('❌ Get hostel error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
