# MongoDB Setup Guide for Eduvate-Me

## Overview
This guide explains how to migrate from SQLite to MongoDB and automatically store all new data creation.

## Installation Steps

### Step 1: Install MongoDB Locally or Use Cloud

#### **Option A: Local MongoDB Installation**

**Windows:**
1. Download MongoDB Community from: https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. MongoDB will be installed as a Windows Service
4. It runs on `localhost:27017` by default

**macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

#### **Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/eduvate`
5. Update `MONGODB_URI` in `.env`

### Step 2: Install MongoDB Dependencies

```bash
cd server
npm install mongoose
npm install
```

### Step 3: Update Environment Variables

**In `server/.env`:**
```env
# For Local MongoDB
MONGODB_URI=mongodb://localhost:27017/eduvate

# OR for MongoDB Atlas (Cloud)
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/eduvate?retryWrites=true&w=majority
```

### Step 4: Seed the Database

```bash
npm run seed:mongodb
```

This command will:
- Connect to MongoDB
- Create all collections with proper indexes
- Clear existing data
- Seed sample data (colleges, users, exams, scholarships, hostels, placements)

### Step 5: Start the Server

```bash
npm run dev
```

## Database Schema (MongoDB Collections)

### Users Collection
```javascript
{
  _id: ObjectId,
  email: "user@example.com",      // Unique, lowercase
  password: "hashed_password",
  name: "User Name",
  createdAt: ISODate,
  updatedAt: ISODate
}
```

### Colleges Collection
```javascript
{
  _id: ObjectId,
  name: "IIT Delhi",
  shortName: "IIT-D",
  location: "Delhi",
  state: "Delhi",
  type: "IIT",
  ranking: 1,
  fees: 200000,
  avgPackage: 1600000,
  highestPackage: 5000000,
  placementRate: 99.5,
  topRecruiters: ["Google", "Amazon", "Microsoft"],
  facilities: ["Library", "Sports", "Hostel"],
  courses: ["B.Tech", "M.Tech", "PhD"],
  established: 1961,
  accreditation: "NAAC A++",
  imageUrl: "url",
  createdAt: ISODate
}
```

### Cutoffs Collection
```javascript
{
  _id: ObjectId,
  collegeId: ObjectId,           // Reference to College
  examType: "jee",               // "jee", "neet", "cuet"
  year: 2024,
  general: 15000,
  obc: 22000,
  sc: 45000,
  st: 60000,
  ews: 18000
}
```

### Other Collections
- **Exams**: Entrance exams (JEE, NEET, CUET)
- **Scholarships**: Scholarship information
- **Hostels**: Hostel/PG information
- **Placements**: Placement statistics by company and sector

## Key Features of MongoDB Setup

### ✅ Automatic Data Storage
- All new user registrations are automatically saved
- New college data is persisted immediately
- No manual database management needed

### ✅ Email Normalization
- All emails are converted to lowercase for consistent authentication
- Case-insensitive login

### ✅ Password Security
- Passwords are hashed using bcryptjs (10 salt rounds)
- Passwords NEVER stored in plain text

### ✅ Indexes for Performance
```javascript
// Automatically created:
- Users: email (unique)
- Cutoffs: collegeId + examType + year (for quick lookups)
- Placements: collegeId + year
```

### ✅ Data Relationships
- Cutoffs reference Colleges via `collegeId`
- Placements reference Colleges via `collegeId`
- Automatic cascade behavior on deletion

## Common Commands

```bash
# Install dependencies
npm install

# Seed MongoDB with initial data
npm run seed:mongodb

# Start development server
npm run dev

# Connect to MongoDB locally (requires mongo CLI)
mongosh
# Then: use eduvate
# Then: db.users.find()

# View all collections
db.listCollections()

# Clear a collection (if needed)
db.colleges.deleteMany({})
```

## Testing the Setup

### 1. Check MongoDB Connection
```bash
# Start server
npm run dev

# Check console for: ✅ MongoDB connected successfully
```

### 2. Test User Registration
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### 3. Verify Data in MongoDB
```bash
# Using MongoDB Compass (GUI): https://www.mongodb.com/products/compass
# Or using mongosh CLI:
mongosh
> use eduvate
> db.users.find()
> db.colleges.find()
```

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: 
- Make sure MongoDB is running: `mongosh` should connect
- Check MONGODB_URI in `.env`
- Restart MongoDB service

### Collection Not Found
```
Error: collection not found
```
**Solution**:
- Run `npm run seed:mongodb` to create collections

### Authentication Failed (MongoDB Atlas)
```
Error: authentication failed
```
**Solution**:
- Check username and password in connection string
- Make sure IP is whitelisted in MongoDB Atlas

## File Structure

```
server/
├── src/
│   ├── config/
│   │   ├── database.ts         (SQLite - deprecated)
│   │   └── mongodb.ts          (MongoDB connection - NEW)
│   ├── models/
│   │   └── index.ts            (Mongoose schemas - NEW)
│   ├── controllers/
│   │   ├── authController.ts   (Uses MongoDB)
│   │   ├── collegesController.ts (Uses MongoDB)
│   │   └── ...
│   ├── seed.ts                 (SQLite seed - keep for reference)
│   ├── seed-mongodb.ts         (MongoDB seed - NEW)
│   └── index.ts                (Updated for MongoDB)
├── .env                        (Updated)
└── package.json                (Updated)
```

## Migration Path

1. ✅ Install mongoose: `npm install mongoose`
2. ✅ Create MongoDB connection: `src/config/mongodb.ts`
3. ✅ Create Mongoose schemas: `src/models/index.ts`
4. ✅ Update controllers to use MongoDB
5. ✅ Update server entry point: `src/index.ts`
6. ✅ Create MongoDB seed script: `src/seed-mongodb.ts`
7. ✅ Run: `npm run seed:mongodb`
8. ✅ Start server: `npm run dev`

## Notes

- **No More SQLite**: All data now persists in MongoDB
- **Automatic Indexes**: Mongoose automatically creates indexes for better performance
- **Scalable**: MongoDB handles large datasets efficiently
- **Cloud Ready**: Easy deployment to MongoDB Atlas or other cloud providers
- **Schema Validation**: Mongoose provides built-in data validation

## Next Steps

1. Install MongoDB locally or sign up for MongoDB Atlas
2. Update `.env` with MongoDB connection string
3. Run `npm install` to install mongoose
4. Run `npm run seed:mongodb` to seed the database
5. Start the server with `npm run dev`

That's it! All new data will automatically be stored in MongoDB. 🎉
