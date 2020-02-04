var express = require("express")
var app = express()
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser')
var cors = require("cors")
var engine = require('consolidate');
var router = express.Router()
var token = require("./Routes/tokens")
var google = require("googleapis");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


let dirname = __dirname + "/mydoc"
app.use(express.static(dirname));
app.engine('html', engine.mustache);
app.set('view engine', 'html');


const myUrl = 'mongodb+srv://AREA:AREA@users-uxyki.mongodb.net/test?retryWrites=true&w=majority';

function hello() {
    console.log("HELLO WORLD")
}

MongoClient.connect(myUrl, { useUnifiedTopology: true }, function (err, db) {
    db = db.db("AREA")

    require("./Routes/register")(app, db)
    require("./Routes/about")(app, db)
    require("./Routes/isonline")(app, db)
    require("./Routes/login")(app, db)
    require("./Routes/deleteUser")(app, db)
    require("./Routes/createAdmins")(app, db)
    require("./Routes/tokens")(app, db)
    require("./Routes/twitchFollowCallback")(app, db)
    require("./Functions/SpotifyService")(app, db)

    require("./Routes/calendar")(app, db)
    require("./Routes/facebook")(app, db)


    app.get("/", (req, res) => {
        console.log(dirname + "/index.html")
        res.sendFile(dirname + "/index.html")
    })

    app.use(function (req, res, next) {
        res.set("Content-Type", "text/html")
        res.status(404).send("404 This ressource doesn't exist");
    });

    let port = process.env.PORT || 8080;
    app.listen(port, () => {
        app.emit('listening', null)
        console.log("Server is up and running on port ", port)
    })

})


module.exports = app
