'use strict';
module.exports = (sequelize, DataTypes) => {
  const order_item = sequelize.define('order_item', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    quantity_ordered: DataTypes.INTEGER
  }, { underscored: true });
  order_item.associate = function(models) {
    order_item.belongsTo(models.order);
  };
  return order_item;
};