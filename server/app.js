var express = require("express")
var app = express()
const MongoClient = require('mongodb').MongoClient;

const myUrl = 'mongodb://localhost:27017';

MongoClient.connect(myUrl, function (err, db) {
    db = db.db("AREA")

    require("./Routes/register")(app, db)
    require("./Routes/isonline")(app, db)

    app.use(function (req, res, next) {
        res.status(404).send('404 page not found');
    });
})

app.listen(8080)