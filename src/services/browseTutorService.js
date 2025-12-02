const Tutor = require('../models/Tutor');

// ছোট demo ডাটা, যদি collection empty থাকে
async function seedIfEmpty() {
  const count = await Tutor.countDocuments();
  if (count > 0) return;

  await Tutor.insertMany([
    {
      fullName: 'Rahim Uddin',
      subjects: ['Math', 'Physics'],
      classes: ['Class 8', 'Class 9', 'Class 10'],
      location: 'Mirpur, Dhaka',
      minRate: 6000,
      maxRate: 8000,
      gender: 'Male',
      rating: 4.8,
    },
    {
      fullName: 'Fahmida Akter',
      subjects: ['English', 'Bangla'],
      classes: ['Class 6', 'Class 7', 'Class 8'],
      location: 'Uttara, Dhaka',
      minRate: 5000,
      maxRate: 7000,
      gender: 'Female',
      rating: 4.9,
    },
    {
      fullName: 'Kamal Hassan',
      subjects: ['Chemistry', 'Biology'],
      classes: ['Class 9', 'Class 10', 'HSC'],
      location: 'Dhanmondi, Dhaka',
      minRate: 7000,
      maxRate: 9000,
      gender: 'Male',
      rating: 4.7,
    },
  ]);
}

async function listTutors(filters = {}) {
  await seedIfEmpty();

  const query = {};

  if (filters.subject) {
    query.subjects = { $regex: filters.subject, $options: 'i' };
  }
  if (filters.className) {
    query.classes = { $regex: filters.className, $options: 'i' };
  }
  if (filters.location) {
    query.location = { $regex: filters.location, $options: 'i' };
  }
  if (filters.gender && filters.gender !== 'Any') {
    query.gender = filters.gender;
  }

  const tutors = await Tutor.find(query).sort({ rating: -1 }).lean();
  return tutors;
}

module.exports = {
  listTutors,
};
