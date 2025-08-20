const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItem');

// Get all menu items grouped by category
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find().sort({ category: 1, name: 1 });
    
    // Group items by category
    const groupedMenu = {};
    menuItems.forEach(item => {
      if (!groupedMenu[item.category]) {
        groupedMenu[item.category] = [];
      }
      groupedMenu[item.category].push({
        id: item._id,
        name: item.name,
        price: item.price
      });
    });
    
    res.json(groupedMenu);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

module.exports = router;