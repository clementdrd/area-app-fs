var SUFFIX_SALT = "0ajkdf43s"
var PREFIX_SALT = "js92ndszz"
var sha256 = require('sha256');


module.exports = function (app, db) {
    app.post('/login', function (req, res) {
        if (req.body.username === "" || req.body.password === "") {
            res.status(400).send("You can't send an empty field")
            return;
        }
        db.collection("users").find({username: req.body.username}).toArray(function(err, result) {
            let password = sha256(PREFIX_SALT + req.body.password + SUFFIX_SALT)
            if (result[0] === undefined) {
                res.status(400).send("This account doesn't exists")
            } else if (result[0].password !== password) {
                res.status(400).send("Passwords doesn't match")
            } else {
                console.log(result[0].userToken)
                let userToken = sha256(req.body.username + new Date().getTime())
                console.log(userToken)
                let insertion = {
                    username: req.body.username,
                    password: password,
                    email: req.body.email,
                    userToken: userToken
                }
                db.collection("users").updateOne(insertion, function(err, resul) {
                    assert.equal(err, null);
                    assert.equal(1, result.result.n);
                    console.log("Updated the document with a random token set in the field userToken");
                    callback(result);
                });
                res.set("UserToken", userToken)
                res.status(200).send("User connected!")
            }
        })
    })
}