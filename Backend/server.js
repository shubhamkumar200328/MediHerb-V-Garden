import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import plantRoutes from './routes/plantRoutes.js'; // Plants API routes
import protectedRoutes from './routes/protected.js';
import { authMiddleware } from './middleware/authMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import learningModuleRoutes from './routes/learningModuleRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import sentimentRoutes from './routes/sentimentRoutes.js';
import activityRoutes from './routes/activityRoutes.js';

import cloudinaryRoutes from './routes/cloudinary.js';

import ollamaRoutes from './routes/ollamaRoutes.js';

// Setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log('✅ MongoDB connection established');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api/plants', plantRoutes); // Plants API
app.use('/api/protected', protectedRoutes);
app.use('/api/users', userRoutes);
app.use('/api/learning-modules', learningModuleRoutes);
app.use('/api/activities', activityRoutes);

app.use('/api/reviews', reviewRoutes);
app.use('/api/sentiments', sentimentRoutes);

app.use('/api/cloudinary', cloudinaryRoutes);

app.use('/api/ollama', ollamaRoutes);

// other setup...
app.use('/api/activities', activityRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('🚀 Server is running.');
});

app.use('/auth/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Authenticated user', user: req.user });
});

// Serve static files (Images)
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});
