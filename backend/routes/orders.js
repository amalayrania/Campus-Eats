import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ordersFilePath = path.join(__dirname, '../models/orders.json');
const ACTIVE_STATUSES = ['pending', 'preparing', 'ready', 'picked-up', 'delivering'];
const ORDER_EXPIRY_MS = 60 * 1000;

// Helper function to read orders
async function readOrders() {
  try {
    const data = await fs.readFile(ordersFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper function to write orders
async function writeOrders(orders) {
  await fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2));
}

// Create new order
router.post('/', async (req, res) => {
  try {
    const orders = await readOrders();
    const now = new Date();
    const activeOrders = orders.filter(
      (order) => order.userId === req.body.userId && ACTIVE_STATUSES.includes(order.status)
    );
    const cancelledOrders = activeOrders.map((order) => ({
      ...order,
      status: 'cancelled',
      updatedAt: now.toISOString(),
    }));
    const remainingOrders = orders.filter((order) => !activeOrders.includes(order));
    // Generate unique ID based on timestamp and random value to avoid collisions
    const newId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newOrderNumber = orders.length > 0
      ? Math.max(...orders.map(o => o.orderNumber || 0)) + 1
      : 1;
    
    const newOrder = {
      id: newId,
      orderNumber: newOrderNumber,
      ...req.body,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedOrders = [...remainingOrders, ...cancelledOrders, newOrder];
    await writeOrders(updatedOrders);
    
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const orders = await readOrders();
    const order = orders.find(o => o.id === req.params.id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error reading order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Get active orders for user
router.get('/user/:userId/active', async (req, res) => {
  try {
    const orders = await readOrders();
    const now = Date.now();
    const activeOrders = [];
    const updatedOrders = orders.map((order) => {
      if (order.userId !== req.params.userId) {
        return order;
      }
      if (!ACTIVE_STATUSES.includes(order.status)) {
        return order;
      }
      const createdAt = Date.parse(order.createdAt);
      if (!Number.isNaN(createdAt) && now - createdAt > ORDER_EXPIRY_MS) {
        return { ...order, status: 'expired', updatedAt: new Date().toISOString() };
      }
      activeOrders.push(order);
      return order;
    });
    
    // Return the most recent active order or null
    const mostRecentOrder = activeOrders.length > 0 
      ? activeOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]
      : null;
    
    if (updatedOrders.some((order, index) => order !== orders[index])) {
      await writeOrders(updatedOrders);
    }

    res.json(mostRecentOrder);
  } catch (error) {
    console.error('Error reading active orders:', error);
    res.status(500).json({ error: 'Failed to fetch active orders' });
  }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const orders = await readOrders();
    const orderIndex = orders.findIndex(o => o.id === req.params.id);
    
    if (orderIndex === -1) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    const { status } = req.body;
    const validStatuses = ['pending', 'preparing', 'ready', 'picked-up', 'delivering', 'delivered', 'cancelled', 'expired'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = new Date().toISOString();
    
    await writeOrders(orders);
    res.json(orders[orderIndex]);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

export default router;
