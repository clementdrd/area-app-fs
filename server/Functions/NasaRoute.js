
var fct = require("./NasaFunctions")

module.exports = function route(app, db) {
    app.get('/nasadaily', function (req, res) {
        if (req.headers.usertoken === undefined || req.headers.usertoken === "") {
            res.status(401).send("Unauthorized")
        }
        let userQuery = {
            userToken: req.headers.usertoken
        }
        let update = {
            $set: {
                nasa : true,
                userToken: req.headers.usertoken
            }
        }
        db.collection("Services").updateOne(userQuery, update)
        fct.NasaDaily(req.headers.usertoken, db)
        res.status(200).send('Activated');
    })
}