const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const authService = {};

authService.register = async ({name,email,password,phone,role}) => {
  if (!name || !email || !password) throw new Error('name,email,password required');
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error('Email already registered');
  const user = await User.create({ name, email, password_hash: password, phone, role: role || 'guardian' });
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
  return { token, user: user.toSafeJSON() };
};

authService.login = async ({email,password}) => {
  if (!email || !password) throw new Error('email and password required');
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid credentials');
  const ok = await user.verifyPassword(password);
  if (!ok) throw new Error('Invalid credentials');
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
  return { token, user: user.toSafeJSON() };
};

module.exports = authService;
