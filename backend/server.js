import express from 'express';
import { corsMiddleware } from './middleware/cors.js';
import restaurantsRouter from './routes/restaurants.js';
import ordersRouter from './routes/orders.js';
import authRouter from './routes/auth.js';
import courierStatsRouter from './routes/courier-stats.js';

// Add this with your other routes
app.use('/api/courier-stats', courierStatsRouter);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(corsMiddleware);
app.use(express.json());

// Routes
app.use('/api/restaurants', restaurantsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/auth', authRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Campus Eats API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Campus Eats API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      restaurants: '/api/restaurants',
      orders: '/api/orders',
      auth: '/api/auth/login'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Campus Eats API server running on http://localhost:${PORT}`);
  console.log(`📍 API endpoints:`);
  console.log(`   - GET  /api/restaurants`);
  console.log(`   - GET  /api/restaurants/:id`);
  console.log(`   - GET  /api/restaurants/:id/menu`);
  console.log(`   - POST /api/orders`);
  console.log(`   - GET  /api/orders/:id`);
  console.log(`   - GET  /api/orders/user/:userId/active`);
  console.log(`   - PATCH /api/orders/:id/status`);
  console.log(`   - POST /api/auth/login`);
  console.log(`   - GET  /api/auth/users/:id`);
});
