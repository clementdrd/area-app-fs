var express = require("express")
var app = express()
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser')
var cors = require("cors")

// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

const myUrl = 'mongodb+srv://AREA:AREA@users-uxyki.mongodb.net/test?retryWrites=true&w=majority';

MongoClient.connect(myUrl, { useUnifiedTopology: true }, function (err, db) {
    db = db.db("AREA")

    require("./Routes/register")(app, db)
    require("./Routes/isonline")(app, db)
    require("./Routes/login")(app, db)
    require("./Routes/deleteUser")(app, db)
    require("./Routes/createAdmins")(app, db)

    app.use(function (req, res, next) {
        res.set("Content-Type", "text/html")
        res.status(404).send('404 page not found');
    });
    app.listen(process.env.PORT || 8080, function() {
        app.emit('listening', null)
    })

})


module.exports = app
