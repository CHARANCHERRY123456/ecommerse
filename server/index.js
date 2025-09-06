import express from 'express';
import cors from 'cors'
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

import router from './router/index.js';
import connectDb from './db.js'

connectDb()

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(morgan("dev"))

// Simple CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use("/api", router);

app.get("/" , (req , res) => res.json({ 
  message: "🚀 E-commerce API is running!", 
  status: "OK",
  timestamp: new Date().toISOString() 
}));

app.use((err, req, res, next) => {
  console.error('Global Error:', err.stack);
  res.status(err.status || 500).json({ 
    message: err.message || 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.use((req, res) => {
  res.status(404).json({ 
    message: `Route ${req.method} ${req.originalUrl} not found`,
    availableRoutes: [
      'GET /',
      'POST /api/auth/login',
      'POST /api/auth/signup',
      'GET /api/items',
      'POST /api/items',
      'GET /api/cart',
      'POST /api/cart/add',
      'POST /api/cart/remove'
    ]
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server started successfully on port ${PORT}`);
  console.log(`📍 API available at: http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/`);
});