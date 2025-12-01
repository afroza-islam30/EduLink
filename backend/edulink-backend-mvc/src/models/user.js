const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    role: { type: DataTypes.ENUM('guardian','tutor','admin'), allowNull:false, defaultValue:'guardian' },
    name: { type: DataTypes.STRING(150), allowNull:false },
    email: { type: DataTypes.STRING(150), allowNull:false, unique:true },
    password_hash: { type: DataTypes.STRING(255), allowNull:false },
    phone: { type: DataTypes.STRING(30) },
    avatar_url: { type: DataTypes.STRING(500) },
    bio: { type: DataTypes.TEXT }
  }, { tableName:'users', timestamps:true, underscored:true });

  User.beforeCreate(async (user) => {
    if (user.password_hash) {
      const salt = await bcrypt.genSalt(10);
      user.password_hash = await bcrypt.hash(user.password_hash, salt);
    }
  });

  User.prototype.verifyPassword = function(password){
    return bcrypt.compare(password, this.password_hash);
  };

  User.prototype.toSafeJSON = function(){
    const o = this.toJSON();
    delete o.password_hash;
    return o;
  };

  return User;
};
