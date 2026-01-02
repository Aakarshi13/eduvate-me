import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/mongodb';
import authRoutes from './routes/auth';
import collegesRoutes from './routes/colleges';
import examsRoutes from './routes/exams';
import scholarshipsRoutes from './routes/scholarships';
import hostelsRoutes from './routes/hostels';
import placementsRoutes from './routes/placements';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize MongoDB connection
connectDB().catch((error) => {
  console.error('Failed to connect to MongoDB:', error);
  process.exit(1);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'EduVate API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/colleges', collegesRoutes);
app.use('/api/exams', examsRoutes);
app.use('/api/scholarships', scholarshipsRoutes);
app.use('/api/hostels', hostelsRoutes);
app.use('/api/placements', placementsRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
