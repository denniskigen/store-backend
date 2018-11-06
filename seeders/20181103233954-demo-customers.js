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
    return queryInterface.bulkInsert('customers', [
      {
        first_name: 'Paul',
        last_name: 'Sum',
        phone: '0791170875',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        first_name: 'Kevin',
        last_name: 'Ndong',
        phone: '0792300310',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        first_name: 'Evans',
        last_name: 'Ouko',
        phone: '0700490004',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        first_name: 'Jane',
        last_name: 'Juma',
        phone: '0791100914',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        first_name: 'Nina',
        last_name: 'Rabare',
        phone: '0705774077',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        first_name: 'Fatma',
        last_name: 'Mohamed',
        phone: '0720958391',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        first_name: 'Nancy',
        last_name: 'Okoth',
        phone: '0719424565',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        first_name: 'Thomas',
        last_name: 'Were',
        phone: '0705699957',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        first_name: 'Greg',
        last_name: 'Menge',
        phone: '0726015158',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      },
      {
        first_name: 'Barry',
        last_name: 'Stafford',
        phone: '0722722906',
        created_at: Sequelize.literal('NOW()'),
        updated_at: Sequelize.literal('NOW()')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('customers', null, {});
  }
};
