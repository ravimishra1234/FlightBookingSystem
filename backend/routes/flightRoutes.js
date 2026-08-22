const express = require('express');
const router = express.Router();
const {
  searchFlights, getAllFlights, getFlightById,
  createFlight, updateFlight, deleteFlight,
} = require('../controllers/flightController');
const { protect } = require('../middleware/authMiddleware');
const { adminMiddleware } = require('../middleware/adminMiddleware');

router.get('/search', searchFlights);
router.get('/', getAllFlights);
router.get('/:id', getFlightById);

// Admin only
router.post('/', protect, adminMiddleware, createFlight);
router.put('/:id', protect, adminMiddleware, updateFlight);
router.delete('/:id', protect, adminMiddleware, deleteFlight);

module.exports = router;
