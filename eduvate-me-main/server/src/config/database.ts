import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, '../../eduvate.db');
export const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

export const initDatabase = () => {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Colleges table
  db.exec(`
    CREATE TABLE IF NOT EXISTS colleges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      short_name TEXT NOT NULL,
      location TEXT NOT NULL,
      state TEXT NOT NULL,
      type TEXT NOT NULL,
      ranking INTEGER,
      fees REAL,
      avg_package REAL,
      highest_package REAL,
      placement_rate REAL,
      top_recruiters TEXT,
      facilities TEXT,
      courses TEXT,
      established INTEGER,
      accreditation TEXT,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Cutoffs table
  db.exec(`
    CREATE TABLE IF NOT EXISTS cutoffs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      college_id INTEGER NOT NULL,
      exam_type TEXT NOT NULL,
      year INTEGER NOT NULL,
      general INTEGER,
      obc INTEGER,
      sc INTEGER,
      st INTEGER,
      ews INTEGER,
      FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE
    )
  `);

  // Exams table
  db.exec(`
    CREATE TABLE IF NOT EXISTS exams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      full_name TEXT NOT NULL,
      date DATE NOT NULL,
      result_date DATE,
      counselling_start DATE,
      counselling_end DATE,
      type TEXT NOT NULL,
      registration_deadline DATE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Scholarships table
  db.exec(`
    CREATE TABLE IF NOT EXISTS scholarships (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      provider TEXT NOT NULL,
      amount REAL NOT NULL,
      eligibility TEXT NOT NULL,
      deadline DATE NOT NULL,
      category TEXT NOT NULL,
      exam_types TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Hostels table
  db.exec(`
    CREATE TABLE IF NOT EXISTS hostels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      location TEXT NOT NULL,
      nearby_colleges TEXT NOT NULL,
      distance REAL NOT NULL,
      rent REAL NOT NULL,
      amenities TEXT NOT NULL,
      gender TEXT NOT NULL,
      rating REAL,
      reviews INTEGER DEFAULT 0,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Placement data table
  db.exec(`
    CREATE TABLE IF NOT EXISTS placements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      college_id INTEGER NOT NULL,
      year INTEGER NOT NULL,
      sector TEXT NOT NULL,
      company TEXT NOT NULL,
      offers INTEGER,
      avg_package REAL,
      highest_package REAL,
      FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE
    )
  `);

  console.log('✅ Database initialized successfully');
};
