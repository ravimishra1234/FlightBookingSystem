const User = require('../models/User');
const Flight = require('../models/Flight');
const Booking = require('../models/Booking');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/generateToken');

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, role: 'admin' }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Admin login successful!',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Admin
const getDashboardStats = async (req, res, next) => {
  try {
    const [totalUsers, totalFlights, totalBookings, bookings] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      Flight.countDocuments(),
      Booking.countDocuments({ bookingStatus: 'confirmed' }),
      Booking.find({ bookingStatus: 'confirmed' }).select('totalAmount'),
    ]);

    const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);

    // Monthly booking trend (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyBookings = await Booking.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' },
          },
          count: { $sum: 1 },
          revenue: { $sum: '$totalAmount' },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    // Top routes
    const topRoutes = await Booking.aggregate([
      { $match: { bookingStatus: 'confirmed' } },
      {
        $lookup: {
          from: 'flights',
          localField: 'flightId',
          foreignField: '_id',
          as: 'flight',
        },
      },
      { $unwind: '$flight' },
      {
        $group: {
          _id: { source: '$flight.source', destination: '$flight.destination' },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalFlights,
        totalBookings,
        totalRevenue,
        monthlyBookings,
        topRoutes,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Admin
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: 'user' }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, users });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings
// @route   GET /api/admin/bookings
// @access  Admin
const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email phone')
      .populate('flightId')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    next(error);
  }
};

// @desc    Seed admin account
// @route   POST /api/admin/seed
// @access  Public (only works once)
const seedAdmin = async (req, res, next) => {
  try {
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: 'Admin already exists.' });
    }

    const admin = await User.create({
      name: 'SkyJourney Admin',
      phone: '+91-9999999999',
      email: process.env.ADMIN_EMAIL || 'admin@skyjourney.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123456',
      role: 'admin',
    });

    res.status(201).json({
      success: true,
      message: 'Admin account created!',
      email: admin.email,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { adminLogin, getDashboardStats, getAllUsers, getAllBookings, seedAdmin };
