const postRequestService = require('../services/postRequestService');
const authService = require('../services/authService');

async function createRequest(req, res) {
  const user = authService.getUserFromRequest(req);

  if (!user || user.role !== 'guardian') {
    return res.status(403).json({ success: false, message: 'Guardian only' });
  }

  try {
    const doc = await postRequestService.createRequest({
      guardianId: user.userId,
      ...req.body,
    });

    return res.json({ success: true, request: doc });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
}

module.exports = { createRequest };
