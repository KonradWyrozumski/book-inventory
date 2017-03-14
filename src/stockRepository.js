var url = 'mongodb://localhost:27017/book-inventory';
var MongoClient = require('mongodb').MongoClient

var collection = MongoClient.connect(url, { bufferMaxEntries: 0 }).then(function (db) {
    return db.collection('books');
}).catch(function (err) {
    console.log(err);
});

function stockUp(isbn, count) {
    return collection.then(function (collection) {
        return collection.updateOne({ isbn: isbn }, { isbn: isbn, count: count }, { upsert: true });
    });
}

function findAll() {
    return collection.then(function (collection) {
        return collection.find({}).toArray();
    });
}

function findByIsbn(isbn) {
    return collection.then(function (collection) {
        return collection.find({ "isbn": isbn }).limit(1).next();
    });
}

module.exports = {
    stockUp: stockUp,
    findAll: findAll,
    findByIsbn: findByIsbn
};