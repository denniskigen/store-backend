'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const customersController = require('./controllers/customersController');
const ordersController = require('./controllers/ordersController');
const itemsController = require('./controllers/itemsController');

app.use(bodyParser.json());

// routes 
app.get('/', (req, res) => {
  res.status(200).send('Welcome to my store API');
});

// customers
app.get('/api/customers', customersController.list);
app.get('/api/customers/:id', customersController.find);
app.post('/api/customers', customersController.create);
app.put('/api/customers/:id', customersController.update);
app.delete('/api/customers', customersController.delete);

// orders
app.get('/api/orders', ordersController.list);
app.get('/api/orders/:id', ordersController.find);
app.post('/api/orders', ordersController.create);
app.delete('/api/orders/:id', ordersController.delete);

// items
app.get('/api/items', itemsController.list);
app.get('/api/items/:id', itemsController.find);
app.post('/api/items', itemsController.create);
app.delete('/api/items/:id', itemsController.delete);

app.post('/api/orderItems', ordersController.create);

module.exports = app;