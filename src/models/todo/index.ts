import { DataTypes } from "sequelize";

const getTodoModel = (sequelize) => {
  const Todo = sequelize.define('todo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Todo.associate = (models) => {
    Todo.belongsTo(models.User);
  };

  return Todo;
};

export default getTodoModel;