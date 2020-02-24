var imgur = require('imgur');
var https = require('https')
const fetch = require("node-fetch");
const FormData = require("form-data");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = function (app, db) {
    app.get('/ImgurFavorites', (req, res) => {
        if (req.headers.usertoken === undefined || req.headers.usertoken === "") {
            res.status(401).send("Unauthorized")
        }
        var buffer = req.headers.usertoken;
        db.collection("tokens").find({userToken: buffer}).toArray(function(er, resu) {
            if (resu[0] === undefined) {
                res.status(404).send("Undefined userToken in tokens collections");
            }
            var headers = {
                'Authorization' : 'Bearer ' + resu[0].imgur
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
        })

        
        res.status(200).send("get info from Imgur account");
    });

}