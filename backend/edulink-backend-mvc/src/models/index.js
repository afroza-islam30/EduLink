const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user')(sequelize, Sequelize.DataTypes);
const Job = require('./job')(sequelize, Sequelize.DataTypes);
const Offer = require('./offer')(sequelize, Sequelize.DataTypes);
const Feedback = require('./feedback')(sequelize, Sequelize.DataTypes);

// Associations
User.hasMany(Job, { foreignKey:'posted_by_id', as:'jobs' });
Job.belongsTo(User, { foreignKey:'posted_by_id', as:'poster' });

User.hasMany(Offer, { foreignKey:'tutor_id', as:'offersMade' });
Job.hasMany(Offer, { foreignKey:'job_id', as:'offers' });
Offer.belongsTo(User, { foreignKey:'tutor_id', as:'tutor' });
Offer.belongsTo(Job, { foreignKey:'job_id', as:'job' });

User.hasMany(Feedback, { foreignKey:'from_user_id', as:'feedbacksGiven' });
User.hasMany(Feedback, { foreignKey:'to_user_id', as:'feedbacksReceived' });
Feedback.belongsTo(User, { foreignKey:'from_user_id', as:'fromUser' });
Feedback.belongsTo(User, { foreignKey:'to_user_id', as:'toUser' });

module.exports = { sequelize, User, Job, Offer, Feedback };
