'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('orders', [
      { order_date: new Date(), customer_id: 2 },
      { order_date: new Date(), customer_id: 2 },
      { order_date: new Date(), customer_id: 1 },
      // { order_date: '2019-10-01', customer_id: 2,
      //   created_at: Sequelize.literal('NOW()'), updated_at: Sequelize.literal('NOW()') },
      // { order_date: '2019-11-11', customer_id: 2, 
      //   created_at: Sequelize.literal('NOW()'), updated_at: Sequelize.literal('NOW()')},
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('orders', null, {});
  }
};
