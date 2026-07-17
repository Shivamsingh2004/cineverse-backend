import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import movieRoutes from './routes/movies.js';
dotenv.config();
connectDB();
const app = express();

// Trust proxy is required for secure cookies when behind a reverse proxy like Render
app.set('trust proxy', 1);

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/users', authRoutes);
app.use('/api/movies', movieRoutes);
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'CineVerse API is running' });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n  🎬 CineVerse API running on http://localhost:${PORT}\n`);
});
