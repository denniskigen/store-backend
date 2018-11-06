'use strict';

const db = require('../models');
const order = db.order;
const order_item = db.order_item;

exports.list = (req, res) => {
  return order.findAll({
    include: [{
      model: db.order_item
    }]
  })
    .then(orders => res.status(200).send(orders))
    .catch(error => res.status(400).send(error));
}

exports.find = (req, res) => {
  return order.findByPk(req.params.id, {
    include: [{ model: db.order_item }]
  })
    .then(order => {
      if (!order) {
        return res.status(404).send({
          message: 'Order not found'
        });
      }
      return res.status(200).send(order);
    })
    .catch(error => {
      console.log('Error: ', error);
      res.status(400).send(error);
    })
}

exports.create = (req, res) => {
  console.log(req);
   order.create({
     order_date: new Date(), 
     customer_id: req.body.customer_id
   })
    .then(order => {
      const order_id = order.id;
      console.log('order_id: ', order_id);
      req.body.items.forEach(element => {
        order_item.create({
          quantity_ordered: element.quantity_ordered,
          item_code: element.item_code,
          order_id: order_id
        })
          .then(order_item => console.log(order_item))
          .catch(error => console.log('Error creating order_item: ', error))
        
      });

      res.status(201).send(order)
    })
    .catch(error => res.status(400).send(error));
}

exports.update = (req, res) => {
  return order.findByPk(req.params.id, {})
    .then(order => {
      if (!order) {
        return res.status(404).send({
          message: 'Order not found'
        });
      }
      return order.update({
        order_date: req.body.order_date || item.order_date
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
  return order.findByPk(req.params.id)
    .then(order => {
      if (!order) {
        return res.status(400).send({
          message: 'Order not found'
        });
      }
      return order.destroy()
        .then(() => res.status(400).send())
        .catch(error => {
          console.log('Error: ', error);
          res.status(400).send(error);
        });
    });
}