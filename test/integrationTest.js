var request = require('supertest');

describe('POST /stock', function () {
    it('should return posted data', function (done) {
        var memoryRepository = require('../src/memoryRepository')();
        var app = require('../src/app')(memoryRepository);

        request(app)
            .post('/stock')
            .set('Content-Type', 'application/json')
            .send({ "isbn": "some isbn", "count": "2" })
            .expect(200, { "isbn": "some isbn", "count": "2" }, done);
    });
});

describe('GET /stock/:isbn', function () {
    it('should return correct count', function (done) {
        var memoryRepository = require('../src/memoryRepository')();
        var app = require('../src/app')(memoryRepository);
        memoryRepository._items([{ isbn: '1', count: 2 }, { isbn: '2', count: 3 }]);

        request(app)
            .get('/stock/1')
            .set('Accept', 'Application/json')
            .expect(200, { count: 2 }, done);
    })
})