const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const User = require('../models/User');
const { sendBookingConfirmationEmail, sendCancellationEmail } = require('../services/emailService');

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Private (User)
const createBooking = async (req, res, next) => {
  try {
    const { flightId, passengerName, passengerAge, passengerGender } = req.body;

    // Verify flight exists and has seats
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ success: false, message: 'Flight not found.' });
    }

    if (flight.availableSeats <= 0) {
      return res.status(400).json({ success: false, message: 'No seats available on this flight.' });
    }

    // Check for duplicate booking
    const existingBooking = await Booking.findOne({
      userId: req.user._id,
      flightId,
      bookingStatus: { $ne: 'cancelled' },
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'You have already booked this flight.',
      });
    }

    // Create booking
    const booking = await Booking.create({
      userId: req.user._id,
      flightId,
      passengerName,
      passengerAge,
      passengerGender,
      totalAmount: flight.price,
      seatNumber: `${String.fromCharCode(65 + Math.floor(Math.random() * 6))}${Math.floor(Math.random() * 30) + 1}`,
    });

    // Decrease available seats
    await Flight.findByIdAndUpdate(flightId, {
      $inc: { availableSeats: -1 },
    });

    // Populate booking for response
    const populatedBooking = await Booking.findById(booking._id)
      .populate('flightId')
      .populate('userId', 'name email');

    // Send confirmation email
    await sendBookingConfirmationEmail({
      to: req.user.email,
      passengerName,
      flightNumber: flight.flightNumber,
      airline: flight.airline,
      source: flight.source,
      destination: flight.destination,
      departureTime: flight.departureTime,
      bookingId: booking._id.toString(),
      price: flight.price,
    });

    res.status(201).json({
      success: true,
      message: 'Flight booked successfully! Confirmation email sent.',
      booking: populatedBooking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's bookings
// @route   GET /api/bookings/my-bookings
// @access  Private (User)
const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('flightId')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel a booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private (User)
const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.user._id,
    }).populate('flightId');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    if (booking.bookingStatus === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Booking is already cancelled.' });
    }

    // Update booking status
    booking.bookingStatus = 'cancelled';
    await booking.save();

    // Restore available seats
    await Flight.findByIdAndUpdate(booking.flightId._id, {
      $inc: { availableSeats: 1 },
    });

    // Send cancellation email
    await sendCancellationEmail({
      to: req.user.email,
      passengerName: booking.passengerName,
      bookingId: booking._id.toString(),
      flightNumber: booking.flightId.flightNumber,
      source: booking.flightId.source,
      destination: booking.flightId.destination,
      cancellationDate: new Date(),
    });

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully. Cancellation email sent.',
      booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('flightId')
      .populate('userId', 'name email phone');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    // Ensure user can only see their own bookings (admins can see all)
    if (
      req.user.role !== 'admin' &&
      booking.userId._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }

    res.status(200).json({ success: true, booking });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBooking, getMyBookings, cancelBooking, getBookingById };
