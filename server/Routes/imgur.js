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
            getContentFromImgur(headers, resu[0].userToken)
        })

        function getContentFromImgur(headers, usertoken) {
            //console.log(usertoken)
            var url = 'https://api.imgur.com/3/account/me/favorites';

            fetch(url, {method : "GET", headers: headers})
            .then((res) => 
                res.json()
            ).then((res) => {
                console.log(res)
                let ids = []
                res.data.forEach(element => {
                    ids.push(element.id)
                });
                console.log("UserFavorites = " + ids);
                db.collection("users").find({userToken: usertoken}).toArray(function(er, resu) {
                    var actualFavorites = ids.length;
                    
                    if (actualFavorites > resu[0].favoriteimgur) {
                        commentFavoriteImage(headers, ids);
                        db.collection("users").updateOne({favoriteimgur: resu[0].favoriteimgur}, { $set: {favoriteimgur: actualFavorites } });
                    }
                })
            })
        }

        function commentFavoriteImage(headers, ids) {
            var url = "https://api.imgur.com/3/comment";
            let formData = new FormData();
            formData.append("image_id", ids[0]);
            formData.append("comment", "I love this image!");
                
            fetch(url, {method : "POST", headers: headers, body: formData})
            .then((res) => {
                if (res.status === 200) {
                    return res;
                } else {
                    console.log(res.error.status, res.error.message)
                }
            })
        }
        res.status(200).send("get info from Imgur account");
    });

}