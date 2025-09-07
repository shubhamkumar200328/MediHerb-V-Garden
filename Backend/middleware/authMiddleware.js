import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Helper to extract token from Authorization header
const getTokenFromHeader = (req) => {
  const authHeader = req.headers.authorization || req.header('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  return null;
};

// Middleware to protect routes - verify token and attach user to req
export const authMiddleware = async (req, res, next) => {
  try {
    const token = getTokenFromHeader(req);

    if (!token) {
      return res
        .status(401)
        .json({ message: 'No token, authorization denied' });
    }

    // Verify token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId || decoded.id;

    if (!userId) {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    // Find user by ID, excluding password field
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware to restrict access to admin users only
export const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  next();
};
