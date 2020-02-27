
module.exports = function (app, db) {
    app.get('/trelloGitlabOrga', function (req, res) {
        if (req.headers.usertoken === undefined || req.headers.usertoken === "") {
            res.status(401).send("Unauthorized")
        }
        ActivateTrello(req.headers.usertoken, db, "trellogitlabOrga")
        res.status(200).send('Activated');
    })
    app.get('/gitlabTrelloOrga', function (req, res) {
        if (req.headers.usertoken === undefined || req.headers.usertoken === "") {
            res.status(401).send("Unauthorized")
        }
        ActivateTrello(req.headers.usertoken, db, "gitlabtrelloOrga")
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

