var request = require('supertest');
var assert = require('assert');

describe('getCountByIsbn', function () {
    it('for correct Isbn should return count', async function () {
        var stockRepository = {
            findByIsbn: function (book) {
                return Promise.resolve({ count: 20 })
            }
        };
        var router = require('../src/router')(stockRepository);
        var response = {
            json: function (param) {
                assert.equal(param.count, 20)
 
            }
        };
        await router.getCountByIsbn({ params: { isbn: 1 } }, response);
    });
});

describe('getCountByIsbn', function () {
    it('for correct Isbn call next if book not found', function (done) {
        var stockRepository = {
            findByIsbn: function (book) {
                return Promise.resolve(null)
            }
        };
        var router = require('../src/router')(stockRepository);
        var next = function () {
            done();
        };

        router.getCountByIsbn({ params: { isbn: 2 } }, null, next).catch(done);
    })
});