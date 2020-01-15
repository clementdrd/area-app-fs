var express = require("express")
var app = express()
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser')
var cors = require("cors")
var engine = require('consolidate');
const path = require('path');

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
    app.get("/doc", (req, res) => {
        console.log(dirname + "/index.html")
        res.sendFile(dirname + "/index.html")
    })

    let dirname = __dirname + "/mydoc"
    //add the router
    app.use(express.static(dirname));

    app.engine('html', engine.mustache);
    app.set('view engine', 'html');
    
    app.use(function (req, res, next) {
        res.set("Content-Type", "text/html")
        res.status(404).send('404 page not found');
    });

    let port = process.env.PORT || 8080;
    app.listen(port, () => {
        app.emit('listening', null)
        console.log("Server is up and running on port ", port)
    })

})


module.exports = app
