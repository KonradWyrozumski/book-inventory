module.exports = function (stockRepository) {
    var stockRepository = stockRepository;
    function postStock(req, res, next) {
        stockRepository.stockUp(req.body.isbn, req.body.count)
            .then(function () {
                res.json({
                    isbn: req.body.isbn,
                    count: req.body.count
                })
            })
            .catch(next);
    }

    function getCountByIsbn(req, res, next) {
        return stockRepository.findByIsbn(req.params.isbn)
            .then(function (book) {
                if (book == null) {
                    next();
                }
                else {
                    res.json({
                        count: book.count
                    });
                }

            }).catch(next);
    }

    function getStock(req, res, next) {
        stockRepository.findAll()
            .then(function (docs) {
                res.json(docs);
            }).catch(next);
    }

    return {
        postStock: postStock,
        getCountByIsbn: getCountByIsbn,
        getStock: getStock
    }
}