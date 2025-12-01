// src/services/dashboardService.js

const User = require('../models/User');

// Safely fetch user; never crash the service
async function safeFindUserById(userId) {
  try {
    if (!userId) return null;
    const user = await User.findById(userId).lean();
    return user || null;
  } catch (e) {
    console.error('safeFindUserById error:', e.message);
    return null;
  }
}

async function getTutorDashboardData(userId) {
  const user = await safeFindUserById(userId);

  const safeUser = user || {
    fullName: 'Tutor',
    email: '',
    phone: '',
    role: 'tutor',
  };

  return {
    user: safeUser,
    summary: {
      welcomeMessage: `Welcome back, ${safeUser.fullName || 'Tutor'}!`,
    },
  };
}

async function getGuardianDashboardData(userId) {
  const user = await safeFindUserById(userId);

  const safeUser = user || {
    fullName: 'Guardian',
    email: '',
    phone: '',
    role: 'guardian',
  };

  return {
    user: safeUser,
    summary: {
      welcomeMessage: `Welcome back, ${safeUser.fullName || 'Guardian'}!`,
    },
  };
}

module.exports = {
  getTutorDashboardData,
  getGuardianDashboardData,
};
