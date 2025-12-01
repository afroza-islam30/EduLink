const feedbackService = require('../services/feedbackService');

exports.create = async (req, res) => {
  try {
    const payload = { fromUserId: req.user.id, toUserId: req.body.toUserId, rating: req.body.rating, comment: req.body.comment, tags: req.body.tags };
    const fb = await feedbackService.create(payload);
    return res.status(201).json(fb);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const items = await feedbackService.list(req.query);
    return res.json(items);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
