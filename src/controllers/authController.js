const authService = require('../services/authService');

// POST /api/register
async function register(req, res) {
  try {
    const user = await authService.registerUser(req.body);
    return res.status(201).json({ success: true, user });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
}

// POST /api/login
async function login(req, res) {
  try {
    const { token, user } = await authService.loginUser(req.body);
    return res.json({ success: true, token, user });
  } catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }
}

// POST /api/forgot-password
async function forgotPassword(req, res) {
  try {
    const { email, newPassword } = req.body;
    const user = await authService.resetPasswordByEmail({ email, newPassword });

    return res.json({
      success: true,
      message: 'Password updated successfully. You can now log in.',
      user,
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
}

module.exports = {
  register,
  login,
  forgotPassword, // 👈 exported
};
