import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersFilePath = path.join(__dirname, '../models/users.json');

// Simple login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    const data = await fs.readFile(usersFilePath, 'utf-8');
    const users = JSON.parse(data);
    let user = users.find(u => u.email === email);
    
    // If user doesn't exist, create a new one for development
    if (!user) {
      user = {
        id: `user${users.length + 1}`,
        email,
        name: 'New User',
        phone: '',
        address: ''
      };
      users.push(user);
      await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get user profile
router.get('/users/:id', async (req, res) => {
  try {
    const data = await fs.readFile(usersFilePath, 'utf-8');
    const users = JSON.parse(data);
    const user = users.find(u => u.id === req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error reading user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

export default router;
