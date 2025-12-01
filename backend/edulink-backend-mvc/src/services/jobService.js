const { Job, User } = require('../models');

const jobService = {};

jobService.list = async ({ subject, grade, location, limit=20, offset=0 }) => {
  const where = {};
  if (subject) where.subject = subject;
  if (grade) where.grade = grade;
  if (location) where.location = location;
  const items = await Job.findAll({
    where, limit: parseInt(limit,10), offset: parseInt(offset,10),
    order: [['created_at','DESC']],
    include: [{ model: User, as: 'poster', attributes:['id','name','avatar_url'] }]
  });
  return items;
};

jobService.create = async ({ data, userId }) => {
  if (!data.title || !data.subject) throw new Error('title and subject required');
  const job = await Job.create({ ...data, posted_by_id: userId });
  return job;
};

jobService.detail = async (id) => {
  const job = await Job.findByPk(id, { include: [{ model: User, as:'poster', attributes:['id','name','email'] }] });
  if (!job) throw new Error('Job not found');
  return job;
};

module.exports = jobService;
