const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function registerUser(payload) {
  const { fullName, email, phone, password, role } = payload;

  if (!fullName || !email || !phone || !password || !role) {
    throw new Error('All fields are required');
  }

  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error('Email already registered');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    email,
    phone,
    passwordHash,
    role,
  });

  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  };
}

async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password');

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new Error('Invalid email or password');

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      phone: user.phone,
    },
  };
}

function getUserFromRequest(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;

  const token = authHeader.split(' ')[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

// 🔹 Used by forgot-password
async function resetPasswordByEmail({ email, newPassword }) {
  if (!email || !newPassword) {
    throw new Error('Email and new password are required');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('No user found with this email'); // 👈 this is the message you’ll see for invalid email
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  user.passwordHash = passwordHash;
  await user.save();

  return {
    id: user._id,
    email: user.email,
    fullName: user.fullName,
  };
}

module.exports = {
  registerUser,
  loginUser,
  getUserFromRequest,
  resetPasswordByEmail,
};
