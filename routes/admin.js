const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/menuItem');

// Simple admin credentials (in production, use proper authentication)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

// Login endpoint
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    req.session.isAdmin = true;
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Logout endpoint
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: 'Logged out successfully' });
});

// Middleware to check admin authentication
const requireAdmin = (req, res, next) => {
  if (!req.session.isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Get all menu items for admin
router.get('/items', requireAdmin, async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ category: 1, name: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// Add new menu item
router.post('/items', requireAdmin, async (req, res) => {
  try {
    const { name, price, category } = req.body;
    
    if (!name || !price || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const newItem = new MenuItem({
      name: name.trim(),
      price: parseFloat(price),
      category: category.trim()
    });
    
    await newItem.save();
    res.status(201).json({ success: true, item: newItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// Update menu item
router.put('/items/:id', requireAdmin, async (req, res) => {
  try {
    const { name, price, category } = req.body;
    
    if (!name || !price || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        price: parseFloat(price),
        category: category.trim()
      },
      { new: true }
    );
    
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json({ success: true, item: updatedItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// Delete menu item
router.delete('/items/:id', requireAdmin, async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Check admin status
router.get('/status', (req, res) => {
  res.json({ isAdmin: !!req.session.isAdmin });
});

module.exports = router;