"use strict";

const sinon = require('sinon');
const request = require('request');
const chai = require('chai');
const should = chai.should();

const customers = require('./fixtures/customers.json');

const base = 'http://localhost:8080'

describe('Customer routes', () => {
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
  
  // describe('GET /', () => {
  //   test('responds with a welcome message', async () => {
  //     this.get.yields(null, responseObject, JSON.stringify(responseBody));
  //     request.get('/', (err, res, body) => {
  //       expect(res.statusCode).toBe(200);
  //       expect(res.headers['content-type'].should.contain('application/json'));
  //       body = JSON.parse(body);
  //       body.status.should.eql('success');
  //       body.data.length.should.eql(3);
  //     });
  //   });
  // });

  describe('GET /api/customers', () => {
    test('should returns all customers', async () => {
      this.get.yields(
        null, customers.all.success.res, JSON.stringify(customers.all.success.body)
      );
      request.get('/api/customers', (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type'].should.contain('application/json'));
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data.length.should.eql(3);
        body.data[0].should.include.keys(
          'id', 'first_name', 'last_name', 'phone'
        );
        body.data[0].first_name.should.eql('John');
        body.data[0].last_name.should.eql('Doe');
      });
    });
  });

  describe('GET /api/customers/:id', () => {
    test('should return a customer with the given id', async () => {
      const obj = customers.single.success;
      this.get.yields(null, obj.res, JSON.stringify(obj.body));
      request.get('${base}/api/customers/1', (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type'].should.contain('application/json'));
        body = JSON.parse(body);
        body.data[0].should.include.keys(
          'id', 'first_name', 'last_name', 'phone'
        );
        body.data[0].first_name.should.eql('John');
        body.data[0].last_name.should.eql('Doe');
      });
    });

    test('should throw an error if the customer does not exist', async () => {
      const obj = customers.single.failure;
      this.get.yields(null, obj.res, JSON.stringify(obj.body));
      request.get('${base}/api/customers/999', (err, res, body) => {
        expect(res.statusCode).toBe(404);
        expect(res.headers['content-type'].should.contain('application/json'));        
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('Customer not found');
      })
    });
  });

  describe('POST /api/customers', () => {
   test('should return the customer that was added', async () => {
      const options = { 
        body: {
          first_name: "Ennie",
          last_name: "Wan",
          phone: "0723333333"
        },
        json: true,
        url: `${base}/api/customers`
      };
      const obj = customers.add.success;
      this.post.yields(null, obj.res, JSON.stringify(obj.body));
      request.post(options, (err, res, body) => {
        res.statusCode.should.equal(201);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data[0].should.include.keys(
          'first_name', 'last_name', 'phone'
        );
        body.data[0].first_name.should.eql('Ennie');
        body.data[0].last_name.should.eql('Wan');
      });
    });

    test("should throw an error if the payload is malformed", async () => {
      const options = {
        body: { first_name: "Not Enough" },
        json: true,
        url: `${base}/api/customers`
      }
      const obj = customers.add.failure;
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

  describe('PUT /api/customers/:id', () => {
    test('should return the updated customer', async () => {
      const options = {
        body: { first_name: 'Sam' },
        json: true,
        url: `${base}/api/v1/customers/4`
      };
      const obj = customers.update.success;
      this.put.yields(null, obj.res, JSON.stringify(obj.body));
      request.put(options, (err, res, body) => {
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data[0].should.include.keys(
          'id', 'first_name', 'last_name', 'phone'
        );
        body.data[0].first_name.should.eql('Sam');
        body.data[0].last_name.should.eql('Body');
      });
    });

    test('should throw an error if the customer does not exist', async () => {
      const options = {
        body: { first_name: 'Samuel' },
        json: true,
        url: `${base}/api/v1/customers/5`
      };
      const obj = customers.update.failure;
      this.put.yields(null, obj.res, JSON.stringify(obj.body));
      request.put(options, (err, res, body) => {
        res.statusCode.should.equal(404);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('Customer not found');
      });
    });
  });

  describe('DELETE /api/v1/customer/:id', () => {
    it('should return the customer that was deleted', (done) => {
      const obj = customers.delete.success;
      this.delete.yields(null, obj.res, JSON.stringify(obj.body));
      request.delete(`${base}/api/v1/customer/5`, (err, res, body) => {
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data[0].should.include.keys(
          'id', 'first_name', 'last_name', 'phone'
        );
        body.data[0].first_name.should.eql('Sam');
        done();
      });
    });
    it('should throw an error if the customer does not exist', (done) => {
      const obj = customers.delete.failure;
      this.delete.yields(null, obj.res, JSON.stringify(obj.body));
      request.delete(`${base}/api/v1/customer/5`, (err, res, body) => {
        res.statusCode.should.equal(404);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('Customer not found');
        done();
      });
    });
  });
});