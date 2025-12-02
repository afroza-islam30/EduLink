// src/controllers/dashboardController.js

const dashboardService = require('../services/dashboardService');
const authService = require('../services/authService');

// ===== TUTOR DASHBOARD =====
async function tutorDashboard(req, res) {
  const authUser = authService.getUserFromRequest(req);

  if (!authUser) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  if (authUser.role !== 'tutor') {
    return res.status(403).json({ success: false, message: 'Tutor only' });
  }

  try {
    const data = await dashboardService.getTutorDashboardData(authUser.userId);
    return res.json({ success: true, data });   // <-- FIXED
  } catch (err) {
    console.error('tutorDashboard error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// ===== GUARDIAN DASHBOARD =====
async function guardianDashboard(req, res) {
  const authUser = authService.getUserFromRequest(req);

  if (!authUser) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  if (authUser.role !== 'guardian') {
    return res.status(403).json({ success: false, message: 'Guardian only' });
  }

  try {
    const data = await dashboardService.getGuardianDashboardData(authUser.userId);
    return res.json({ success: true, data });   // <-- FIXED
  } catch (err) {
    console.error('guardianDashboard error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

module.exports = {
  tutorDashboard,
  guardianDashboard,
};
