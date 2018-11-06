"use strict";

const sinon = require('sinon');
const request = require('request');
const chai = require('chai');
const should = chai.should();

const items = require('./fixtures/items.json');

const base = 'http://localhost:8080'

describe('item routes', () => {
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

  describe('GET /api/items', () => {
    test('should returns all items', async () => {
      this.get.yields(
        null, items.all.success.res, JSON.stringify(items.all.success.body)
      );
      request.get('/api/items', (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type'].should.contain('application/json'));
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data.length.should.eql(4);
        body.data[0].should.include.keys(
          'id', 'item_code', 'item_name', 'unit_cost'
        );
        body.data[0].item_code.should.eql(1001);
        body.data[0].item_name.should.eql('Milk');
        body.data[0].unit_cost.should.eql(45);
      });
    });
  });

  describe('GET /api/items/:id', () => {
    test('should return a item with the given id', async () => {
      const obj = items.single.success;
      this.get.yields(null, obj.res, JSON.stringify(obj.body));
      request.get('${base}/api/items/1', (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type'].should.contain('application/json'));
        body = JSON.parse(body);
        body.data[0].should.include.keys(
          'id', 'item_code', 'item_name', 'unit_cost'
        );
        body.data[0].item_code.should.eql(1001);
        body.data[0].item_name.should.eql('Milk');
        body.data[0].unit_cost.should.eql(45);
      });
    });

    test('should throw an error if the item does not exist', async () => {
      const obj = items.single.failure;
      this.get.yields(null, obj.res, JSON.stringify(obj.body));
      request.get('${base}/api/items/999', (err, res, body) => {
        expect(res.statusCode).toBe(404);
        expect(res.headers['content-type'].should.contain('application/json'));        
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('Item not found');
      })
    });
  });

  describe('POST /api/items', () => {
   test('should return the item that was added', async () => {
      const options = { 
        body: {
          item_code: 1005,
          item_name: "Greengrams",
          unit_cost: 100
        },
        json: true,
        url: `${base}/api/items`
      };
      const obj = items.add.success;
      this.post.yields(null, obj.res, JSON.stringify(obj.body));
      request.post(options, (err, res, body) => {
        res.statusCode.should.equal(201);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data[0].should.include.keys(
          'id', 'item_code', 'item_name', 'unit_cost'
        )
        body.data[0].item_code.should.eql(1005);
        body.data[0].item_name.should.eql('Greengrams');
        body.data[0].unit_cost.should.eql(100);
      });
    });

    test("should throw an error if the payload is malformed", async () => {
      const options = {
        body: { item_code: "Not Enough" },
        json: true,
        url: `${base}/api/items`
      }
      const obj = items.add.failure;
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

  describe('PUT /api/items/:id', () => {
    test('should return the updated item', async () => {
      const options = {
        body: { item_code: '1010' },
        json: true,
        url: `${base}/api/v1/items/4`
      };
      const obj = items.update.success;
      this.put.yields(null, obj.res, JSON.stringify(obj.body));
      request.put(options, (err, res, body) => {
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data[0].should.include.keys(
          'id', 'item_code', 'item_name', 'unit_cost'
        )
        body.data[0].item_code.should.eql(1005);
        body.data[0].item_name.should.eql('Greengrams')
        body.data[0].unit_cost.should.eql(100);
      });
    });

    test('should throw an error if the item does not exist', async () => {
      const options = {
        body: { item_name: 'Greengrams' },
        json: true,
        url: `${base}/api/v1/items/5`
      };
      const obj = items.update.failure;
      this.put.yields(null, obj.res, JSON.stringify(obj.body));
      request.put(options, (err, res, body) => {
        res.statusCode.should.equal(404);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('Item not found');
      });
    });
  });

  describe('DELETE /api/v1/item/:id', () => {
    it('should return the item that was deleted', (done) => {
      const obj = items.delete.success;
      this.delete.yields(null, obj.res, JSON.stringify(obj.body));
      request.delete(`${base}/api/item/5`, (err, res, body) => {
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data[0].should.include.keys(
          'id', 'item_code', 'item_name', 'unit_cost'
        );
        body.data[0].item_name.should.eql('Greengrams');
        body.data[0].item_code.should.eql(1005);
        body.data[0].unit_cost.should.eql(100);
        done();
      });
    });
    it('should throw an error if the item does not exist', (done) => {
      const obj = items.delete.failure;
      this.delete.yields(null, obj.res, JSON.stringify(obj.body));
      request.delete(`${base}/api/item/5`, (err, res, body) => {
        res.statusCode.should.equal(404);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('Item not found');
        done();
      });
    });
  });
});