const browseTutorService = require('../services/browseTutorService');
const authService = require('../services/authService');

async function getTutors(req, res) {
  const user = authService.getUserFromRequest(req);

  if (!user || user.role !== 'guardian') {
    return res.status(403).json({ success: false, message: 'Guardian only' });
  }

  try {
    const tutors = await browseTutorService.listTutors({
      subject: req.query.subject || '',
      className: req.query.className || '',
      location: req.query.location || '',
      gender: req.query.gender || '',
    });

    return res.json({ success: true, tutors });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
}

module.exports = { getTutors };
