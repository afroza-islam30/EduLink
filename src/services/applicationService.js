const Application = require('../models/Application');

async function listGuardianApplications(guardianId) {
  return Application.find({ guardian: guardianId })
    .populate('tutor')
    .populate('request')
    .sort({ createdAt: -1 })
    .lean();
}

async function changeStatus({ guardianId, applicationId, status }) {
  const app = await Application.findOne({
    _id: applicationId,
    guardian: guardianId,
  });

  if (!app) throw new Error('Application not found');

  app.status = status;
  await app.save();

  return app;
}

module.exports = {
  listGuardianApplications,
  changeStatus,
};
