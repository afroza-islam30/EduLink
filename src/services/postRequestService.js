const TuitionRequest = require('../models/TuitionRequest');

async function createRequest(data) {
  const {
    guardianId,
    studentName,
    className,
    subjects,
    location,
    salary,
    daysPerWeek,
    preferredGender,
    details,
  } = data;

  if (!guardianId || !studentName || !className || !subjects || !location || !salary || !daysPerWeek) {
    throw new Error('All required fields must be filled');
  }

  const doc = await TuitionRequest.create({
    guardianId,
    studentName,
    className,
    subjects,
    location,
    salary,
    daysPerWeek,
    preferredGender: preferredGender || 'Any',
    details: details || '',
  });

  return doc;
}

async function listGuardianRequests(guardianId) {
  return TuitionRequest.find({ guardianId }).sort({ createdAt: -1 }).lean();
}

module.exports = {
  createRequest,
  listGuardianRequests,
};
