

module.exports = function (app, db) {
    app.get('/imgurnasadaily', function (req, res) {
        if (req.headers.usertoken === undefined || req.headers.usertoken === "") {
            res.status(401).send("Unauthorized")
        }
        ActivateImgur(req.headers.usertoken, db)
        res.status(200).send('Activated');
    })
}

function ActivateImgur(token, db)
{
    let userQuery = {
        userToken: token
    }
    let update = {
        $set: {
            imgurnasa : true,
            userToken: token
        }
    }
    db.collection("Services").updateOne(userQuery, update)
}

