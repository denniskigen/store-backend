"use strict";

const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require("sequelize-test-helpers");

const customer = require("../customer");
const order = require("../order");

describe("customer", () => {
  const Model = customer(sequelize, dataTypes);
  const instance = new Model();

  checkModelName(Model)('customer');

  // Test that the model's name is the name we expect,
  // and that it has the properties we expect
  describe("properties", () => {
    ;["first_name", "last_name", "phone"].forEach(checkPropertyExists(instance));
  });

  // Test associations
  describe("check associations", () => {
    beforeAll(() => {
      Model.associate({ order });
    });

    it("defined a hasMany association with Order", () => {
      expect(Model.hasMany).to.have.been.calledWith(order);
    });
  });
});
