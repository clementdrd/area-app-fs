

module.exports = function (app, db) {
    app.get('/spotifyhistory', function (req, res) {
        if (req.headers.usertoken === undefined || req.headers.usertoken === "") {
            res.status(401).send("Unauthorized")
        }
        if (req.headers.mode === undefined || req.headers.mode === "")
            res.status(400).send("Bad Request")
        EnableService(db,req.headers.mode, usertoken)
        res.status(200).send('Activated');
    })
    app.get('/spotifyresume', function (req, res) {
        if (req.headers.usertoken === undefined || req.headers.usertoken === "") {
            res.status(401).send("Unauthorized")
        }
        EnableService(db,"resume", req.headers.usertoken)
        res.status(200).send('Activated');
    })
}


function EnableService(db, service, usertoken)
{

    let userQuery = {
        userToken: usertoken
    }
    let update = {
        $set: {
            ["spotify" + service] : true,
            userToken: usertoken
        }
    }
    db.collection("Services").updateOne(userQuery, update)
}


