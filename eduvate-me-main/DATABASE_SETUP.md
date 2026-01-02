# Database Setup Guide for Eduvate-Me

## Overview
This project uses **SQLite** with the **better-sqlite3** library for database operations. The database is automatically created and seeded on the server startup.

## Database Creation Steps

### 1. **Automatic Database Initialization**
The database is created automatically when the server starts. The database file is created at:
```
server/eduvate.db
```

### 2. **Database Schema**
The following tables are created automatically:

#### **Users Table**
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

#### **Colleges Table**
```sql
CREATE TABLE colleges (
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
  top_recruiters TEXT,      -- Stored as JSON
  facilities TEXT,            -- Stored as JSON
  courses TEXT,               -- Stored as JSON
  established INTEGER,
  accreditation TEXT,
  image_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

#### **Cutoffs Table** (JEE/NEET admission cutoffs by year and category)
```sql
CREATE TABLE cutoffs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  college_id INTEGER NOT NULL,
  exam_type TEXT NOT NULL,      -- 'jee', 'neet', 'cuet'
  year INTEGER NOT NULL,
  general INTEGER,
  obc INTEGER,
  sc INTEGER,
  st INTEGER,
  ews INTEGER,
  FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE
)
```

#### **Exams Table**
```sql
CREATE TABLE exams (
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
```

#### **Scholarships Table**
```sql
CREATE TABLE scholarships (
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
```

#### **Hostels Table**
```sql
CREATE TABLE hostels (
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
```

#### **Placements Table**
```sql
CREATE TABLE placements (
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
```

## How to Initialize the Database

### Step 1: Install Dependencies
```bash
cd server
npm install
```

### Step 2: Create the Database
The database is created automatically when you run:

```bash
npm run seed
```

This command:
1. Creates all tables if they don't exist
2. Clears existing data (if any)
3. Seeds the database with sample data from `seedData.ts`
4. Creates initial users with hashed passwords

### Step 3: Start the Server
```bash
npm run dev
```

The database will be created at `server/eduvate.db`

## Key Features

### ✅ Automatic Schema Creation
- Tables are created automatically with `CREATE TABLE IF NOT EXISTS`
- No manual SQL scripts needed

### ✅ Password Hashing
- User passwords are hashed using bcryptjs (salt rounds: 10)
- Passwords are NEVER stored in plain text

### ✅ Email Normalization
- All emails are converted to lowercase for consistent authentication
- Users can sign in with any case variation (Test@Example.com = test@example.com)

### ✅ Foreign Key Support
- SQLite foreign keys are enabled
- Cascade deletion ensures data integrity

### ✅ JSON Storage
- Complex data (top_recruiters, facilities, courses) are stored as JSON strings
- Automatically parsed during API responses

## File Structure
```
server/
├── src/
│   ├── config/
│   │   └── database.ts          (Database initialization)
│   ├── seed.ts                  (Database seeding script)
│   ├── seedData.ts              (Sample data)
│   └── index.ts                 (Server entry point)
├── eduvate.db                   (SQLite database file - created after first run)
└── package.json
```

## Important Commands

```bash
# Initialize and seed database
npm run seed

# Start development server (creates DB if needed)
npm run dev

# View database (requires sqlite3 CLI)
sqlite3 eduvate.db

# Reset database (delete and recreate)
rm eduvate.db && npm run seed
```

## Environment Variables
The database location can be configured in `server/src/config/database.ts`:
```typescript
const dbPath = path.join(__dirname, '../../eduvate.db');
```

## Notes

- Database is **SQLite** (single file, no server needed)
- Better-sqlite3 is synchronous (simpler error handling)
- Foreign keys are enabled by default
- All timestamps use `CURRENT_TIMESTAMP` from SQLite
- JSON data is stored as text but parsed in controllers

That's it! The database is fully set up and ready to use. 🎉
