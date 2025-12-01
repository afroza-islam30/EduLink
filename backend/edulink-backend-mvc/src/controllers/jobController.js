const jobService = require('../services/jobService');

exports.list = async (req, res) => {
  try {
    const items = await jobService.list(req.query);
    return res.json(items);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const job = await jobService.create({ data: req.body, userId: req.user.id });
    return res.status(201).json(job);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.detail = async (req, res) => {
  try {
    const job = await jobService.detail(req.params.id);
    return res.json(job);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};
