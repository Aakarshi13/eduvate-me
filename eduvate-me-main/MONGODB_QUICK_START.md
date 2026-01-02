# MongoDB Migration - Quick Start

## What Changed?

Your project now supports **MongoDB** instead of SQLite. All new data is automatically stored in MongoDB.

## Setup in 5 Minutes

### 1. **Install MongoDB**

**Windows:**
- Download from: https://www.mongodb.com/try/download/community
- Run installer and follow steps
- MongoDB starts automatically on `localhost:27017`

**macOS:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

**Or use MongoDB Cloud (Atlas):**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create free cluster
- Copy connection string

### 2. **Update Configuration**

Edit `server/.env`:
```env
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/eduvate

# OR MongoDB Atlas (Cloud)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eduvate
```

### 3. **Install Dependencies**

```bash
cd server
npm install
```

### 4. **Seed Database**

```bash
npm run seed:mongodb
```

Output:
```
🌱 Starting database seeding...
🗑️  Clearing existing data...
🧑‍💻 Seeding users...
📚 Seeding colleges...
📊 Seeding cutoffs...
📝 Seeding exams...
🎓 Seeding scholarships...
🏠 Seeding hostels...
💼 Seeding placements...
🎉 Database seeding completed successfully!
```

### 5. **Start Server**

```bash
npm run dev
```

Output:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

## Automatic Data Storage

✅ **New users** → Automatically saved to MongoDB  
✅ **New colleges** → Automatically saved to MongoDB  
✅ **New exams** → Automatically saved to MongoDB  
✅ **New data** → Persisted instantly  

## What's Different?

| Feature | SQLite | MongoDB |
|---------|--------|---------|
| **Storage** | Single file | Database server |
| **Scalability** | Limited | Unlimited |
| **Cloud Ready** | No | Yes ✅ |
| **Real-time** | Manual | Automatic ✅ |
| **Data Types** | Basic | Rich objects ✅ |

## Database Collections

1. **users** - User accounts
2. **colleges** - College information
3. **cutoffs** - JEE/NEET admission cutoffs
4. **exams** - Entrance examinations
5. **scholarships** - Scholarship programs
6. **hostels** - Hostel/PG information
7. **placements** - Placement data

## Verify It Works

```bash
# Terminal 1: Start server
npm run dev

# Terminal 2: Test registration
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Check MongoDB (use MongoDB Compass or mongosh):
# You should see the user in the "users" collection
```

## Important Notes

- ✅ Email normalization enabled (case-insensitive login)
- ✅ Passwords are hashed (bcryptjs with 10 salt rounds)
- ✅ Automatic indexes for fast queries
- ✅ Relationship management with references
- ✅ Data validation with Mongoose schemas

## Files Modified

1. `server/package.json` - Added mongoose
2. `server/.env` - MongoDB configuration
3. `server/src/index.ts` - MongoDB connection
4. `server/src/config/mongodb.ts` - **NEW**
5. `server/src/models/index.ts` - **NEW**
6. `server/src/controllers/authController.ts` - Uses MongoDB
7. `server/src/controllers/collegesController.ts` - Uses MongoDB
8. `server/src/seed-mongodb.ts` - **NEW**

## Troubleshooting

**MongoDB not running?**
```bash
mongosh  # Should connect if MongoDB is running
```

**Connection refused error?**
- Make sure MongoDB service is running
- Check MONGODB_URI in .env
- Restart MongoDB

**Seed failed?**
```bash
# Check connection first
mongosh

# Then try seeding again
npm run seed:mongodb
```

## Next Steps

1. Install & start MongoDB
2. Update `.env` file
3. Run `npm run seed:mongodb`
4. Start server: `npm run dev`
5. Try registering a new user
6. Check data in MongoDB Compass or mongosh

**All set!** Your application now automatically stores all data in MongoDB. 🎉
