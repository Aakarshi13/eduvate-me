import { Request, Response } from 'express';
import { db } from '../config/database';

export const getAllHostels = async (req: Request, res: Response) => {
  try {
    const { location, type, gender, maxRent } = req.query;
    
    let query = 'SELECT * FROM hostels WHERE 1=1';
    const params: any[] = [];

    if (location) {
      query += ' AND location LIKE ?';
      params.push(`%${location}%`);
    }

    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }

    if (gender && gender !== 'unisex') {
      query += ' AND (gender = ? OR gender = "unisex")';
      params.push(gender);
    }

    if (maxRent) {
      query += ' AND rent <= ?';
      params.push(Number(maxRent));
    }

    query += ' ORDER BY rating DESC, rent ASC';

    const hostels = db.prepare(query).all(...params);

    // Parse JSON fields
    const parsedHostels = hostels.map((hostel: any) => ({
      ...hostel,
      nearby_colleges: hostel.nearby_colleges ? JSON.parse(hostel.nearby_colleges) : [],
      amenities: hostel.amenities ? JSON.parse(hostel.amenities) : [],
    }));

    res.json({ hostels: parsedHostels });
  } catch (error) {
    console.error('Get hostels error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getHostelById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const hostel = db
      .prepare('SELECT * FROM hostels WHERE id = ?')
      .get(id) as any;

    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }

    // Parse JSON fields
    const parsedHostel = {
      ...hostel,
      nearby_colleges: hostel.nearby_colleges ? JSON.parse(hostel.nearby_colleges) : [],
      amenities: hostel.amenities ? JSON.parse(hostel.amenities) : [],
    };

    res.json({ hostel: parsedHostel });
  } catch (error) {
    console.error('Get hostel error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
