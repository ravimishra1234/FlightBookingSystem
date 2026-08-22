const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flight',
      required: [true, 'Flight ID is required'],
    },
    passengerName: {
      type: String,
      required: [true, 'Passenger name is required'],
      trim: true,
    },
    passengerAge: {
      type: Number,
      required: [true, 'Passenger age is required'],
      min: [1, 'Age must be at least 1'],
      max: [120, 'Age cannot exceed 120'],
    },
    passengerGender: {
      type: String,
      required: [true, 'Passenger gender is required'],
      enum: ['male', 'female', 'other'],
    },
    bookingStatus: {
      type: String,
      enum: ['confirmed', 'cancelled', 'pending'],
      default: 'confirmed',
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
    },
    seatNumber: {
      type: String,
      default: null,
    },
    // Payment placeholder for future integration
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending',
    },
    paymentId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
