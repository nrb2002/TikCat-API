const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true
    },
    ticketType: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    quantityAvailable: {
      type: Number,
      required: true,
      min: 0
    },
    saleStartDate: {
      type: Date,
      required: true
    },
    saleEndDate: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ticket', ticketSchema);