const { Offer, Job, User } = require('../models');

const offerService = {};

offerService.create = async ({ jobId, tutorId, proposedFee, message }) => {
  if (!jobId || !tutorId) throw new Error('jobId and tutorId required');
  const job = await Job.findByPk(jobId);
  if (!job) throw new Error('Job not found');
  const tutor = await User.findByPk(tutorId);
  if (!tutor) throw new Error('Tutor not found');
  const offer = await Offer.create({ job_id: jobId, tutor_id: tutorId, proposed_fee: proposedFee || null, message: message || null });
  return offer;
};

offerService.list = async ({ jobId, tutorId }) => {
  const where = {};
  if (jobId) where.job_id = jobId;
  if (tutorId) where.tutor_id = tutorId;
  return Offer.findAll({ where, order:[['created_at','DESC']], include:[{ model: User, as:'tutor', attributes:['id','name','avatar_url'] }, { model: Job, as:'job', attributes:['id','title'] }] });
};

offerService.updateStatus = async ({ offerId, status, actorId }) => {
  const allowed = ['pending','accepted','rejected','cancelled'];
  if (!allowed.includes(status)) throw new Error('Invalid status');
  const offer = await Offer.findByPk(offerId);
  if (!offer) throw new Error('Offer not found');
  const job = await Job.findByPk(offer.job_id);
  if (actorId !== job.posted_by_id) throw new Error('Only job poster can change status');
  offer.status = status;
  await offer.save();
  return offer;
};

module.exports = offerService;
