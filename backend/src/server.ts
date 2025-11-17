import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import path from 'path';
import { exec } from 'child_process'; // ✅ Added for deployment
import { Router } from 'express';

const deployRouter = Router();

// Add your deployment route handling logic here
deployRouter.post('/deploy', (req, res) => {
  // Add your deployment logic here
  res.json({ status: 'Deployment initiated' });
});

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Database connection
export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Test database connection
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0].now });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// ✅ Webhook route for GitHub auto-deploy
import ordersRouter from './routes/orders';
app.use('/api/orders', ordersRouter);

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
  console.log(`📊 Database: ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}`);
});
