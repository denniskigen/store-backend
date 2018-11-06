'use strict';

const db = require('./models');
const app = require('./app');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('store', 'kigen', 'keygen', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: 'false',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log(`Connected to the database successfully`);
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const port = process.env.port || 8080;

db.sequelize.sync({ hooks: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});