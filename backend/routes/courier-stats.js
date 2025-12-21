import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const statsFilePath = path.join(__dirname, '../models/courier-stats.json');

// Get courier stats
router.get('/:courierId', async (req, res) => {
  try {
    const data = await fs.readFile(statsFilePath, 'utf-8');
    const stats = JSON.parse(data);
    const courierStats = stats.find(s => s.courierId === req.params.courierId);
    
    if (!courierStats) {
      return res.json({
        courierId: req.params.courierId,
        deliveries: 0,
        earnings: 0,
        rating: 5.0
      });
    }
    
    res.json(courierStats);
  } catch (error) {
    console.error('Error reading courier stats:', error);
    res.json({
      courierId: req.params.courierId,
      deliveries: 0,
      earnings: 0,
      rating: 5.0
    });
  }
});

export default router;