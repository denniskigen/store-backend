'use strict';

module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define('customer', 
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      phone: DataTypes.STRING
    }, 
    { underscored: true }
  );
  customer.associate = function(models) {
    customer.hasMany(models.order);
  };
  return customer;
};