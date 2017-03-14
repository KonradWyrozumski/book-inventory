
module.exports = function (stockRepository) {
    var router = require('./router')(stockRepository);
    var middleware = require('./middleware')();
    var express = require('express');
    var bodyParser = require('body-parser');
    var assert = require('assert');

    var app = express();
    app.use(bodyParser.json());

    function logger(req, res, next) {
        console.log("Incoming request at: " + new Date());
        next();
    }

    app.get('/', logger, function (req, res) {
        res.send('Hello World!');
    });

    app.get('/error', logger, function (req, res) {
        throw new Error();
    });

    app.post('/stock', router.postStock);
    app.get('/stock', router.getStock);
    app.get('/stock/:isbn', router.getCountByIsbn);

    app.use(middleware.clientError);
    app.use(middleware.serverError);

    return app;
};