const Flight = require('../models/Flight');

// @desc    Search flights
// @route   GET /api/flights/search?source=&destination=&departureDate=
// @access  Public
const searchFlights = async (req, res, next) => {
  try {
    const { source, destination, departureDate } = req.query;

    if (!source || !destination || !departureDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide source, destination, and departure date.',
      });
    }

    const startOfDay = new Date(departureDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(departureDate);
    endOfDay.setHours(23, 59, 59, 999);

    const flights = await Flight.find({
      source: { $regex: new RegExp(source, 'i') },
      destination: { $regex: new RegExp(destination, 'i') },
      departureTime: { $gte: startOfDay, $lte: endOfDay },
      status: 'scheduled',
      availableSeats: { $gt: 0 },
    }).sort({ price: 1 });

    res.status(200).json({
      success: true,
      count: flights.length,
      flights,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all flights
// @route   GET /api/flights
// @access  Public
const getAllFlights = async (req, res, next) => {
  try {
    const flights = await Flight.find().sort({ departureTime: 1 });
    res.status(200).json({ success: true, count: flights.length, flights });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single flight
// @route   GET /api/flights/:id
// @access  Public
const getFlightById = async (req, res, next) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ success: false, message: 'Flight not found.' });
    }
    res.status(200).json({ success: true, flight });
  } catch (error) {
    next(error);
  }
};

// @desc    Create flight (Admin)
// @route   POST /api/flights
// @access  Admin
const createFlight = async (req, res, next) => {
  try {
    const {
      airline, flightNumber, source, destination,
      departureTime, arrivalTime, price, totalSeats,
    } = req.body;

    const flight = await Flight.create({
      airline, flightNumber, source, destination,
      departureTime, arrivalTime, price,
      totalSeats, availableSeats: totalSeats,
    });

    res.status(201).json({ success: true, message: 'Flight created successfully.', flight });
  } catch (error) {
    next(error);
  }
};

// @desc    Update flight (Admin)
// @route   PUT /api/flights/:id
// @access  Admin
const updateFlight = async (req, res, next) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });

    if (!flight) {
      return res.status(404).json({ success: false, message: 'Flight not found.' });
    }

    res.status(200).json({ success: true, message: 'Flight updated successfully.', flight });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete flight (Admin)
// @route   DELETE /api/flights/:id
// @access  Admin
const deleteFlight = async (req, res, next) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);
    if (!flight) {
      return res.status(404).json({ success: false, message: 'Flight not found.' });
    }
    res.status(200).json({ success: true, message: 'Flight deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchFlights, getAllFlights, getFlightById,
  createFlight, updateFlight, deleteFlight,
};
