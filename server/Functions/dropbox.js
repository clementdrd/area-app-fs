const fetch = require("node-fetch");
var request = require('request');

module.exports = function (app, db) {
    app.get('/send_nasa_pic_to_dropbox', function (req, res) {
        if (req.headers.usertoken == undefined || req.headers.usertoken == "") {
            res.status(401).send("Unauthorized")
        }
        else {
            // let token = new Token(db)
            db.collection("tokens").find({userToken: req.headers.usertoken}).toArray((err, result) => {
                ActivateDropbox(req.headers.usertoken, db, "Nasafilehistory")
            })
            res.status(200).send('Activated');
        }
    })
    app.get('/send_best_img_pic_to_dropbox', function (req, res) {
        if (req.headers.usertoken == undefined || req.headers.usertoken == "") {
            res.status(401).send("Unauthorized")
        }
        else {
            db.collection("tokens").find({userToken: req.headers.usertoken}).toArray((err, result) => {
                ActivateDropbox(req.headers.usertoken, db, "dropboxbestimage")
            })
            res.status(200).send('Activated');
        }
    })
}

function ActivateDropbox(token, db, name)
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