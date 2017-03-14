var request = require('supertest');
var memoryRepository = require('../src/memoryRepository');
var app = require('../src/app')(memoryRepository());

describe('POST /stock', function() {
    it('should return posted data', function(done) {
        request(app)
        .post('/stock')
        .set('Content-Type', 'application/json')
        .send({"isbn":"some isbn", "count": "2"})
        .expect(200, {"isbn":"some isbn", "count": "2"}, done);
    });
})