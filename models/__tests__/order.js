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

const customer = require("../customer");
const item = require("../item");
const order = require("../order");

describe("order", () => {
  const Model = order(sequelize, dataTypes);
  const instance = new Model();

  checkModelName(Model)("order");

  // Test that the model's name is the name we expect,
  // and that it has the properties we expect
  describe("properties", () => {
    ;["order_date"].forEach(checkPropertyExists(instance));
  });

  // Test associations
  describe("check associations", () => {
    beforeAll(() => {
      Model.associate({ customer })
      Model.associate({ item });
    });

    it("defined a belongsTo association with Customer", () => {
      expect(Model.belongsTo).to.have.been.calledWith(customer);
    });

    it("defined a belongsToMany association with Item through order_item", () => {
      expect(Model.belongsToMany).to.have.been.calledWith(item, { through: 'order_item', onDelete: 'CASCADE' });
    });
  });
});
