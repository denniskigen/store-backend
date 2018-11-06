'use strict';

module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', 
    {
      order_date: { 
        type: DataTypes.DATE
      }
    }, 
    { underscored: true }
  );
  order.associate = function(models) {
    order.belongsTo(models.customer);
    order.hasMany(models.order_item);
    order.belongsToMany(models.item, { through: 'order_item', onDelete: 'CASCADE' })
  };
  return order;
};