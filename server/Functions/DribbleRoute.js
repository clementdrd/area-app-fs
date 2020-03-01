var test = require("./DribbleFunctions").getShots


module.exports = function (app, db) {
    app.get('/dribblepost', function (req, res) {
        if (req.headers.usertoken === undefined || req.headers.usertoken === "") {
            res.status(401).send("Unauthorized")
        }
        test(req.headers.usertoken, db)
        ActivateReddit(req.headers.usertoken, db)
        res.status(200).send('Activated');
    })
}

function ActivateReddit(token, db)
{
    let userQuery = {
        userToken: token
    }
    let update = {
        $set: {
            dribblepost : true,
            userToken: token
        }
    }
    db.collection("Services").updateOne(userQuery, update)
}