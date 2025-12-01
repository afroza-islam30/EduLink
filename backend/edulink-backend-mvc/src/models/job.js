module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement:true, primaryKey:true },
    title: { type: DataTypes.STRING(255), allowNull:false },
    subject: { type: DataTypes.STRING(100), allowNull:false },
    grade: { type: DataTypes.STRING(50) },
    location: { type: DataTypes.STRING(255) },
    budget: { type: DataTypes.STRING(100) },
    details: { type: DataTypes.TEXT },
    posted_by_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull:false }
  }, { tableName:'jobs', timestamps:true, underscored:true });

  return Job;
};
