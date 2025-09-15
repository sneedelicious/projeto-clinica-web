const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  description: { type: String },
  status: { type: String, enum: ['pending', 'confirmed', 'canceled'], default: 'pending' },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  weather: {
    description: String,
    temperature: Number,
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);