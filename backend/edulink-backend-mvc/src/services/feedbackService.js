const { Feedback, User } = require('../models');

const feedbackService = {};

feedbackService.create = async ({ fromUserId, toUserId, rating, comment, tags }) => {
  if (!toUserId || !rating) throw new Error('toUserId and rating required');
  if (rating < 1 || rating > 5) throw new Error('rating must be 1-5');
  const toUser = await User.findByPk(toUserId);
  if (!toUser) throw new Error('Recipient not found');
  const tagsString = Array.isArray(tags) ? tags.join(',') : (tags || null);
  const fb = await Feedback.create({ from_user_id: fromUserId, to_user_id: toUserId, rating, comment: comment || null, tags: tagsString });
  return fb;
};

feedbackService.list = async ({ toUserId }) => {
  const where = {};
  if (toUserId) where.to_user_id = toUserId;
  return Feedback.findAll({ where, order:[['created_at','DESC']], include:[{ model: User, as:'fromUser', attributes:['id','name','avatar_url'] }] });
};

module.exports = feedbackService;
