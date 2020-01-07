var SUFFIX_SALT = "0ajkdf43s"
var PREFIX_SALT = "js92ndszz"
var sha256 = require('sha256');

module.exports = function (app, db) {
    app.post("/register", function (req, res) {
        // console.log(req.body)
        db.collection("users").find({username: req.body.username}).toArray(function(err, result) {
            console.log(result[0])
            if (result[0] === undefined) {
                let password = req.body.password
                password = PREFIX_SALT + password + SUFFIX_SALT
                password = sha256(password)
                db.collection("users").insert(req.body)
                console.log(password)
                res.send(200, "User created")
            } else {
                res.send(402, "User already exists")
            }
        })
    })
}