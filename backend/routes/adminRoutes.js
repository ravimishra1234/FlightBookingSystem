const express = require('express');
const router = express.Router();
const {
  adminLogin, getDashboardStats, getAllUsers, getAllBookings, seedAdmin,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { adminMiddleware } = require('../middleware/adminMiddleware');

router.post('/login', adminLogin);
router.post('/seed', seedAdmin); // Run once to create admin account

// Protected admin routes
router.get('/dashboard', protect, adminMiddleware, getDashboardStats);
router.get('/users', protect, adminMiddleware, getAllUsers);
router.get('/bookings', protect, adminMiddleware, getAllBookings);

module.exports = router;
