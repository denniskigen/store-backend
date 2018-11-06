"use strict";

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require("sequelize-test-helpers");

const item = require("../item");
const order = require("../order");

describe("item", () => {
  const Model = item(sequelize, dataTypes);
  const instance = new Model();

  checkModelName(Model)("item");

  // Test that the model's name is the name we expect,
  // and that it has the properties we expect
  describe("properties", () => {
    ;["item_name", "unit_cost"].forEach(checkPropertyExists(instance));
  });

  // Test associations
  describe("check associations", () => {
    beforeAll(() => {
      Model.associate({ order });
    });

    it("defined a belongsToMany association with Order through order_item", () => {
      expect(Model.belongsToMany).to.have.been.calledWith(order, { through: 'order_item', foreignKey: "item_code", onDelete: "CASCADE" });
    });
  });
});
