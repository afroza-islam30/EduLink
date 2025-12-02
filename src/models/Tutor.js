const mongoose = require('mongoose');

const TutorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  subjects: [{ type: String }],
  classes: [{ type: String }],
  location: { type: String },
  minRate: { type: Number },
  maxRate: { type: Number },
  gender: { type: String, default: 'Any' },
  rating: { type: Number, default: 4.5 },
  avatarUrl: { type: String, default: '' },
});

module.exports = mongoose.model('Tutor', TutorSchema);
