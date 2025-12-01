const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

exports.authenticate = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ message:'Authorization required' });
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.id);
    if (!user) return res.status(401).json({ message:'Invalid token' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message:'Invalid token' });
  }
};
