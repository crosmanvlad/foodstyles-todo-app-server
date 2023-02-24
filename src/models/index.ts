import { Sequelize } from 'sequelize';

import getUserModel  from './user';
import getTodoModel from './todo';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres'
  }
)

const models = {
  User: getUserModel(sequelize),
  Todo: getTodoModel(sequelize)
}

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
})

export {
  sequelize,
  models
}
