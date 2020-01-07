var express = require("express")
var app = express()
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser')
var cors = require("cors")

// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

const myUrl = 'mongodb+srv://AREA:AREA@users-uxyki.mongodb.net/test?retryWrites=true&w=majority';

MongoClient.connect(myUrl, function (err, db) {
    db = db.db("AREA")

    console.log("TOTO")
    require("./Routes/register")(app, db)
    require("./Routes/isonline")(app, db)
    require("./Routes/login")(app, db)

    app.use(function (req, res, next) {
        res.status(404).send('404 page not found');
    });
    app.listen(8080, function() {
        app.emit('listening', null)
        console.log("Server is up and running on port 8080")
    })


    app.get('/closeServer', function(req, res) {
        res.send(200)
        server.close();
    })
})


module.exports = app