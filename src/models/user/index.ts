import { DataTypes } from "sequelize";

const getUserModel = (sequelize) => {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Todo, { onDelete: 'CASCADE' });
  };
  
  return User;
};
  
export default getUserModel;