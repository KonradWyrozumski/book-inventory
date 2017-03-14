module.exports = function (stockRepository) {
    var express = require('express')
    var bodyParser = require('body-parser')
    var assert = require('assert');

    var app = express();

    app.use(bodyParser.json());

    function logger(req, res, next) {
        console.log("Incoming request at: " + new Date());
        next();
    }

    app.get('/', logger, function (req, res) {
        res.send('Hello World!')
    });

    app.get('/error', logger, function (req, res) {
        throw new Error();
    });

    app.post('/stock', function (req, res, next) {
        stockRepository.stockUp(req.body.isbn, req.body.count)
            .then(function () {
                res.json({
                    isbn: req.body.isbn,
                    count: req.body.count
                })
            })
            .catch(next);
    })

    app.get('/stock', function (req, res, next) {
        stockRepository.findAll()
            .then(function (docs) {
                res.json(docs);
            }).catch(next);
    })

    app.get('/stock/:isbn', function (req, res, next) {
        stockRepository.findByIsbn(req.params.isbn)
            .then(function (book) {
                if (book == null) {
                    next();
                }
                res.json({
                    count: book.count
                });

            }).catch(next);
    })

    function clientError(req, res, next) {
        var err = new Error("Not found");
        err.status = 404;
        next(err);
    }
    function serverError(err, req, res, next) {
        console.error(err.stack)
        var status = err.status || 500;
        res.status(status).send('On no: ' + status);
    }

    app.use(clientError);
    app.use(serverError);

    return app;
}