module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement:true, primaryKey:true },
    from_user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull:false },
    to_user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull:false },
    rating: { type: DataTypes.TINYINT.UNSIGNED, allowNull:false },
    comment: { type: DataTypes.TEXT },
    tags: { type: DataTypes.STRING(255) }
  }, { tableName:'feedbacks', timestamps:true, underscored:true });

  return Feedback;
};
