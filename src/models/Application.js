const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  request: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TuitionRequest',
    required: true,
  },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor', required: true },
  guardian: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  status: {
    type: String,
    enum: ['pending', 'shortlisted', 'approved', 'rejected'],
    default: 'pending',
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', ApplicationSchema);
