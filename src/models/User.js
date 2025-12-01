const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['tutor', 'guardian'], required: true },

    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    // Tutor fields
    subjectExpertise: String,
    experienceLevel: String,
    preferredLocations: String,

    // Guardian fields
    studentClass: String,
    preferredSchedule: String,
    location: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
