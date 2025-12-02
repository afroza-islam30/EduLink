const applicationService = require('../services/applicationService');
const authService = require('../services/authService');

async function getApplications(req, res) {
  const user = authService.getUserFromRequest(req);

  if (!user || user.role !== 'guardian') {
    return res.status(403).json({ success: false, message: 'Guardian only' });
  }

  try {
    const applications = await applicationService.listGuardianApplications(
      user.userId
    );
    return res.json({ success: true, applications });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
}

async function approve(req, res) {
  const user = authService.getUserFromRequest(req);
  if (!user || user.role !== 'guardian') {
    return res.status(403).json({ success: false, message: 'Guardian only' });
  }

  try {
    const app = await applicationService.changeStatus({
      guardianId: user.userId,
      applicationId: req.body.applicationId,
      status: 'approved',
    });
    return res.json({ success: true, application: app });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
}

async function reject(req, res) {
  const user = authService.getUserFromRequest(req);
  if (!user || user.role !== 'guardian') {
    return res.status(403).json({ success: false, message: 'Guardian only' });
  }

  try {
    const app = await applicationService.changeStatus({
      guardianId: user.userId,
      applicationId: req.body.applicationId,
      status: 'rejected',
    });
    return res.json({ success: true, application: app });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
}

module.exports = {
  getApplications,
  approve,
  reject,
};
