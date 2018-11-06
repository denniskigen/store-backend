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
    return queryInterface.bulkInsert('items', [
      { item_code: 1001, item_name: 'Milk', unit_cost: 45,
        created_at: Sequelize.literal('NOW()'), updated_at: Sequelize.literal('NOW()') },
      { item_code: 1002, item_name: 'Bread', unit_cost: 50,
        created_at: Sequelize.literal('NOW()'), updated_at: Sequelize.literal('NOW()') },
      { item_code: 1003, item_name: 'Sugar', unit_cost: 90,
        created_at: Sequelize.literal('NOW()'), updated_at: Sequelize.literal('NOW()') },
      { item_code: 1004, item_name: 'Maize flour', unit_cost: 130,
        created_at: Sequelize.literal('NOW()'), updated_at: Sequelize.literal('NOW()') },
      { item_code: 1005, item_name: 'Greengrams', unit_cost: 100,
        created_at: Sequelize.literal('NOW()'), updated_at: Sequelize.literal('NOW()') },
      { item_code: 1006, item_name: 'Tomatoes', unit_cost: 10, 
        created_at: Sequelize.literal('NOW()'), updated_at: Sequelize.literal('NOW()') },
      { item_code: 1007, item_name: 'Baked beans', unit_cost: 120, 
        created_at: Sequelize.literal('NOW()'), updated_at: Sequelize.literal('NOW()') },
      { item_code: 1008, item_name: 'Yoghurt', unit_cost: 80, 
        created_at: Sequelize.literal('NOW()'), updated_at: Sequelize.literal('NOW()') },
      { item_code: 1009, item_name: 'Salt', unit_cost: 15, 
        created_at: Sequelize.literal('NOW()'), updated_at: Sequelize.literal('NOW()') },
      { item_code: 1010, item_name: 'Cooking oil', unit_cost: 110,
        created_at: Sequelize.literal('NOW()'), updated_at: Sequelize.literal('NOW()') }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('items', null, {});
  }
};
