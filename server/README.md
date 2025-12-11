# EduVate Backend API

Real-time backend API for the EduVate college admission platform.

## Features

- **Authentication**: JWT-based user authentication with bcrypt password hashing
- **College Management**: CRUD operations for colleges with cutoff data
- **College Predictor**: Real-time college predictions based on rank, category, and exam type
- **Exams**: Calendar of entrance exams with dates and deadlines
- **Scholarships**: Financial aid and scholarship information
- **Hostels**: PG/Hostel finder with location-based search
- **Placements**: Placement statistics and company data

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: SQLite (better-sqlite3) - can be easily switched to PostgreSQL
- **Authentication**: JWT + bcrypt
- **Validation**: express-validator

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Colleges
- `GET /api/colleges` - Get all colleges (with filters)
- `GET /api/colleges/:id` - Get college by ID
- `POST /api/colleges/predict` - Predict colleges based on score

### Exams
- `GET /api/exams` - Get all exams
- `GET /api/exams/:id` - Get exam by ID

### Scholarships
- `GET /api/scholarships` - Get all scholarships (with filters)
- `GET /api/scholarships/:id` - Get scholarship by ID

### Hostels
- `GET /api/hostels` - Get all hostels (with filters)
- `GET /api/hostels/:id` - Get hostel by ID

### Placements
- `GET /api/placements/stats` - Get placement statistics
- `GET /api/placements/college/:collegeId` - Get college-specific placements

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Seed the database
npm run seed

# Start development server
npm run dev
```

### Environment Variables

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=sqlite:./eduvate.db
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

### Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run seed` - Seed database with initial data

## Database Schema

The database includes the following tables:
- `users` - User accounts
- `colleges` - College information
- `cutoffs` - Historical cutoff data
- `exams` - Entrance exam schedules
- `scholarships` - Financial aid programs
- `hostels` - Accommodation options
- `placements` - Placement statistics

## API Response Format

### Success Response
```json
{
  "colleges": [...],
  "message": "Success"
}
```

### Error Response
```json
{
  "error": "Error message"
}
```

## Security

- Passwords are hashed using bcrypt (10 rounds)
- JWT tokens for stateless authentication
- CORS enabled for frontend origin
- Input validation and sanitization
- SQL injection protection via prepared statements

## Future Enhancements

- PostgreSQL migration for production
- Redis caching for frequently accessed data
- Rate limiting and request throttling
- File upload for college images
- WebSocket support for real-time updates
- GraphQL API option
- Email notifications for exam reminders
- Advanced analytics and reporting

## License

MIT
