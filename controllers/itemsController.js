'use strict';

const db = require('../models');
const item = db.item;

exports.list = (req, res) => {
  return item.findAll()
    .then(items => res.status(200).send(items))
    .catch(error => {
      console.log('Error: ', error);
      res.status(400).send(error)
    });
}

exports.find = (req, res) => {
  return item.findByPk(req.params.id)
    .then(item => {
      if (!item) {
        return res.status(404).send({
          message: 'Item not found'
        });
      }
      return res.status(200).send(item);
    })
    .catch(error => {
      console.log('Error: ', error);
      res.status(400).send(error);
    });
}

exports.create = (req, res) => {
  return item.create({
    item_name: req.body.name,
    unit_cost: req.body.unit_cost
  })
  .then(item => res.status(201).send(item))
  .catch(error => {
    console.log('Error: ', error);
    res.status(400).send(error);
  });
}

exports.update = (req, res) => {
  return item.findByPk(req.params.id, {})
    .then(item => {
      if (!item) {
        return res.status(404).send({
          message: 'Item not found'
        });
      }
      return item.update({
        item_no: req.body.item_no || item.item_no,
        name: req.body.name || item.name,
        unit_cost: req.body.unit_cost || item.unit_cost
      })
      .then(() => res.status(200).send(item))
      .catch(error => {
        console.log('Error: ', error);
        res.status(400).send(error);
      })
    })
    .catch(error => {
      console.log('Error: ', error);
      res.status(400).send(error);
    });
}

exports.delete = (req, res) => {
  return item.findByPk(req.params.id)
    .then(item => {
      if(!item) {
        return res.status(400).send({
          message: 'Item not found'
        });
      }
      return item.destroy()
        .then(() => res.status(204).send())
        .catch(error => {
          console.log('Error: ', error);
          res.status(400).send(error);
        })
      })
    .catch(error => res.status(400).send(error));
}