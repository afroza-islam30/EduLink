const mongoose = require('mongoose');

const TuitionRequestSchema = new mongoose.Schema({
  guardianId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  studentName: { type: String, required: true },
  className: { type: String, required: true },
  subjects: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String, required: true },
  daysPerWeek: { type: String, required: true },
  preferredGender: { type: String, default: 'Any' },
  details: { type: String, default: '' },
  status: {
    type: String,
    enum: ['open', 'filled', 'closed'],
    default: 'open',
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TuitionRequest', TuitionRequestSchema);
