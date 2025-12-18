import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const restaurantsFilePath = path.join(__dirname, '../models/restaurants.json');

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(restaurantsFilePath, 'utf-8');
    const restaurants = JSON.parse(data);
    res.json(restaurants);
  } catch (error) {
    console.error('Error reading restaurants:', error);
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});

// Get restaurant by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await fs.readFile(restaurantsFilePath, 'utf-8');
    const restaurants = JSON.parse(data);
    const restaurant = restaurants.find(r => r.id === req.params.id);
    
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    
    res.json(restaurant);
  } catch (error) {
    console.error('Error reading restaurant:', error);
    res.status(500).json({ error: 'Failed to fetch restaurant' });
  }
});

// Get restaurant menu
router.get('/:id/menu', async (req, res) => {
  try {
    const data = await fs.readFile(restaurantsFilePath, 'utf-8');
    const restaurants = JSON.parse(data);
    const restaurant = restaurants.find(r => r.id === req.params.id);
    
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    
    res.json(restaurant.menu || []);
  } catch (error) {
    console.error('Error reading menu:', error);
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
});

export default router;
