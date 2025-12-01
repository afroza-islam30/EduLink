const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const payload = req.body;
    const result = await authService.register(payload);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
