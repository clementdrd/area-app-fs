const fetch = require("node-fetch");
var request = require('request');

module.exports = function (app, db) {
    app.get('/premier_league_schedule_sms', function (req, res) {
        if (req.headers.usertoken == undefined || req.headers.usertoken == "") {
            res.status(401).send("Unauthorized")
        }
        else {
            ActivateFootball(req.headers.usertoken, db, "premierleague")
            res.status(200).send('Activated');
        }
    })
    app.get('/upcoming_match', function (req, res) {
        if (req.headers.usertoken == undefined || req.headers.usertoken == "") {
            res.status(401).send("Unauthorized")
        }
        else {
            ActivateFootball(req.headers.usertoken, db, "upcomingmatch")

            res.status(200).send('Activated');
        }
    })
}

function ActivateFootball(token, db, name)
{
    let userQuery = {
        userToken: token
    }
    let update = {
        $set: {
            [name.toLowerCase()] : true,
            userToken: token
        }
    }
    db.collection("Services").updateOne(userQuery, update)
}