const offerService = require('../services/offerService');

exports.create = async (req, res) => {
  try {
    const payload = { jobId: req.body.jobId, tutorId: req.body.tutorId, proposedFee: req.body.proposedFee, message: req.body.message };
    const offer = await offerService.create(payload);
    return res.status(201).json(offer);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const offers = await offerService.list(req.query);
    return res.json(offers);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const updated = await offerService.updateStatus({ offerId: req.params.id, status: req.body.status, actorId: req.user.id });
    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
