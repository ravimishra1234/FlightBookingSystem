const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema(
  {
    airline: {
      type: String,
      required: [true, 'Airline name is required'],
      trim: true,
    },
    flightNumber: {
      type: String,
      required: [true, 'Flight number is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    source: {
      type: String,
      required: [true, 'Source city is required'],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, 'Destination city is required'],
      trim: true,
    },
    departureTime: {
      type: Date,
      required: [true, 'Departure time is required'],
    },
    arrivalTime: {
      type: Date,
      required: [true, 'Arrival time is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    totalSeats: {
      type: Number,
      required: [true, 'Total seats is required'],
      min: [1, 'Must have at least 1 seat'],
    },
    availableSeats: {
      type: Number,
      required: [true, 'Available seats is required'],
      min: [0, 'Available seats cannot be negative'],
    },
    status: {
      type: String,
      enum: ['scheduled', 'delayed', 'cancelled', 'completed'],
      default: 'scheduled',
    },
  },
  { timestamps: true }
);

// Virtual for flight duration in minutes
flightSchema.virtual('durationMinutes').get(function () {
  return Math.round((this.arrivalTime - this.departureTime) / 60000);
});

flightSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Flight', flightSchema);
