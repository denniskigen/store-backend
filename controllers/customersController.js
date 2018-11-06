"use strict";

const db = require("../models");
const customer = db.customer;

exports.list = (req, res) => {
  return customer.findAll({
    include: [
      {
        model: db.order,
        include: [
          {
          model: db.item
          }
        ]
      }
    ]
  })
    .then(customers => res.status(200).send(customers))
    .catch(error => {
      console.log('Error: ', error);
      res.status(400).send(error);
    });
};

exports.find = (req, res) => {
  return customer.findByPk(req.params.id)
    .then(customer => {
      if (!customer) {
        return res.status(404).send({
          message: 'Customer not found'
        });
      }
      return res.status(200).send(customer);
    })
    .catch(error => {
      console.log('Error: ', error);
      res.status(400).send(error);
    });
};

exports.create = (req, res) => {
  return customer.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone
  })
    .then(customer => res.status(201).send(customer))
    .catch(error => {
        console.log('Error: ', error);
        res.status(400).send(error); 
    });
};

exports.update = (req, res) => {
  return customer.findByPk(req.params.id, {})
    .then(customer => {
      if (!customer) {
        return res.status(404).send({
          message: 'Customer not found'
        });
      }
      return customer.update({
        first_name: req.body.first_name || customer.first_name,
        last_name: req.body.last_name || customer.last_name,
        phone: req.body.phone || customer.phone
      })
      .then(() => res.status(200).send(customer))
      .catch(error => {
        console.log('Error: ', error);
        res.status.send(400).send(error);
      });
    })
    .catch(error => {
      console.log('Error: ', error);
      res.status(400).send(error);
    });
};

exports.delete = (req, res) => {
  return customer.findByPk(req.params.id)
    .then(customer => {
      if (!customer) {
        return res.status(404).send({
          message: 'Customer not found'
        });
      }
      return customer
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => {
          console.log('Error: ', error);
          res.status(400).send(error);
        });
    })
    .catch(error => {
      console.log('Error: ', error);
      res.status(400).send(error)
    });
};
