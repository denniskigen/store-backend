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
    return queryInterface.bulkInsert('order_items', [
      { id: 1, order_id: 1, item_code: 1001, quantity_ordered: 2,
        created_at: Sequelize.literal('NOW()'), updated_at: Sequelize.literal('NOW()') },
      { id: 2, order_id: 1, item_code: 1002, quantity_ordered: 1,
        created_at: Sequelize.literal('NOW()'), updated_at: Sequelize.literal('NOW()') },
      { id: 3, order_id: 2, item_code: 1001, quantity_ordered: 1,
        created_at: Sequelize.literal('NOW()'), updated_at: Sequelize.literal('NOW()') },
      { id: 4, order_id: 3, item_code: 1002, quantity_ordered: 2,
        created_at: Sequelize.literal('NOW()'), updated_at: Sequelize.literal('NOW()') }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('order_items', null, {});
  }
};
