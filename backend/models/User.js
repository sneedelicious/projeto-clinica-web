const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ['patient', 'secretary'], default: 'patient' }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);