module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define('Offer', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement:true, primaryKey:true },
    job_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull:false },
    tutor_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull:false },
    proposed_fee: { type: DataTypes.DECIMAL(10,2) },
    message: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM('pending','accepted','rejected','cancelled'), defaultValue:'pending' }
  }, { tableName:'offers', timestamps:true, underscored:true });

  return Offer;
};
