"use strict";

const sinon = require('sinon');
const request = require('request');
const chai = require('chai');
const should = chai.should();

const orders = require('./fixtures/orders.json');

const base = 'http://localhost:8080'

describe('order routes', () => {
  beforeEach(() => {
    this.get = sinon.stub(request, 'get');
    this.post = sinon.stub(request, 'post');
    this.put = sinon.stub(request, 'put');
    this.delete = sinon.stub(request, 'delete');
  });

  afterEach(() => {
    request.get.restore();
    request.post.restore();
    request.put.restore();
    request.delete.restore();
  });

  describe('GET /api/orders', () => {
    test('should returns all orders', async () => {
      this.get.yields(
        null, orders.all.success.res, JSON.stringify(orders.all.success.body)
      );
      request.get('/api/orders', (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type'].should.contain('application/json'));
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data.length.should.eql(3);
        body.data[0].should.include.keys(
          'id', 'order_date'
        );
        body.data[0].order_date.should.eql("2019-01-01");
      });
    });
  });

  describe('GET /api/orders/:id', () => {
    test('should return a order with the given id', async () => {
      const obj = orders.single.success;
      this.get.yields(null, obj.res, JSON.stringify(obj.body));
      request.get('${base}/api/orders/1', (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type'].should.contain('application/json'));
        body = JSON.parse(body);
        body.data[0].should.include.keys(
          'id', 'order_date'
        );
        body.data[0].order_date.should.eql("2019-01-01");
      });
    });

    test('should throw an error if the order does not exist', async () => {
      const obj = orders.single.failure;
      this.get.yields(null, obj.res, JSON.stringify(obj.body));
      request.get('${base}/api/orders/999', (err, res, body) => {
        expect(res.statusCode).toBe(404);
        expect(res.headers['content-type'].should.contain('application/json'));        
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('Order not found');
      })
    });
  });

  describe('POST /api/orders', () => {
   test('should return the order that was added', async () => {
      const options = { 
        body: {
          "order_date": "2019-11-13"
        },
        json: true,
        url: `${base}/api/orders`
      };
      const obj = orders.add.success;
      this.post.yields(null, obj.res, JSON.stringify(obj.body));
      request.post(options, (err, res, body) => {
        res.statusCode.should.equal(201);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data[0].should.include.keys(
          'id', 'order_date'
        )
        body.data[0].order_date.should.eql("2019-11-13");
      });
    });

    test("should throw an error if the payload is malformed", async () => {
      const options = {
        body: { order_code: "Not Enough" },
        json: true,
        url: `${base}/api/orders`
      }
      const obj = orders.add.failure;
      this.post.yields(null, obj.res, JSON.stringify(obj.body));
      request.post(options, (err, res, body) => {
        res.statusCode.should.equal(400);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        should.exist(body.message);
      });
    });
  });

  // describe('PUT /api/orders/:id', () => {
  //   test('should return the updated order', async () => {
  //     const options = {
  //       body: { "order_date": "2019-11-13" },
  //       json: true,
  //       url: `${base}/api/v1/orders/4`
  //     };
  //     const obj = orders.update.success;
  //     this.put.yields(null, obj.res, JSON.stringify(obj.body));
  //     request.put(options, (err, res, body) => {
  //       res.statusCode.should.equal(200);
  //       res.headers['content-type'].should.contain('application/json');
  //       body = JSON.parse(body);
  //       body.status.should.eql('success');
  //       body.data[0].should.include.keys(
  //         'id', 'order_date'
  //       )
  //       body.data[0].order_code.should.eql(1005);
  //       body.data[0].order_name.should.eql('Greengrams')
  //       body.data[0].unit_cost.should.eql(100);
  //     });
  //   });

  //   test('should throw an error if the order does not exist', async () => {
  //     const options = {
  //       body: { "order_date": "2019-11-13" },
  //       json: true,
  //       url: `${base}/api/v1/orders/5`
  //     };
  //     const obj = orders.update.failure;
  //     this.put.yields(null, obj.res, JSON.stringify(obj.body));
  //     request.put(options, (err, res, body) => {
  //       res.statusCode.should.equal(404);
  //       res.headers['content-type'].should.contain('application/json');
  //       body = JSON.parse(body);
  //       body.status.should.eql('error');
  //       body.message.should.eql('Order not found');
  //     });
  //   });
  // });

  describe('DELETE /api/v1/order/:id', () => {
    it('should return the order that was deleted', (done) => {
      const obj = orders.delete.success;
      this.delete.yields(null, obj.res, JSON.stringify(obj.body));
      request.delete(`${base}/api/order/4`, (err, res, body) => {
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data[0].should.include.keys(
          'id', 'order_date'
        );
        body.data[0].order_date.should.eql("2019-11-13");
        done();
      });
    });
    it('should throw an error if the order does not exist', (done) => {
      const obj = orders.delete.failure;
      this.delete.yields(null, obj.res, JSON.stringify(obj.body));
      request.delete(`${base}/api/order/5`, (err, res, body) => {
        res.statusCode.should.equal(404);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('Order not found');
        done();
      });
    });
  });
});