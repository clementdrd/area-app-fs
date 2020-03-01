const fetch = require("node-fetch");

module.exports = function (app, db) {
    app.get('/trelloGitlab', function (req, res) {
        if (req.headers.usertoken === undefined || req.headers.usertoken === "") {
            res.status(401).send("Unauthorized")
        }
        ActivateTrello(req.headers.usertoken, db, "trellogitlab")
        res.status(200).send('Activated');
    })
    app.get('/gitlabTrello', function (req, res) {
        if (req.headers.usertoken === undefined || req.headers.usertoken === "") {
            res.status(401).send("Unauthorized")
        }
        ActivateTrello(req.headers.usertoken, db, "gitlabtrello")
        res.status(200).send('Activated');
    })
}

function ActivateTrello(token, db, name)
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
