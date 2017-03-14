module.exports = function () {
    return {
        clientError: function (req, res, next) {
            var err = new Error("Not found");
            err.status = 404;
            next(err);
        },
        serverError: function (err, req, res, next) {
            console.error(err.stack)
            var status = err.status || 500;
            res.status(status).send('On no: ' + status);
        }
    }
}