'use strict';

module.exports = (sequelize, DataTypes) => {
  const item = sequelize.define('item', 
    {
      item_code: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      item_name: DataTypes.STRING,
      unit_cost: DataTypes.INTEGER
    }, 
    { underscored: true }
  );
  item.associate = function(models) {
    item.belongsToMany(models.order, { through: 'order_item', foreignKey: 'item_code', onDelete: 'CASCADE' })
  };
  return item;
};