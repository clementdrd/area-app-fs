var SUFFIX_SALT = "0ajkdf43s"
var PREFIX_SALT = "js92ndszz"
var sha256 = require('sha256');

module.exports = function (app, db) {
    app.post("/register", function (req, res) {
        // console.log(req.body)
        if (req.body.username === "" || req.body.password === "") {
            res.status(400).send("You can't send an empty field")
            return;
        }
        db.collection("users").find({username: req.body.username}).toArray(function(err, result) {
            if (result[0] === undefined) {
                password = sha256(PREFIX_SALT + req.body.password + SUFFIX_SALT)
                db.collection("users").insert(req.body)
                console.log(password)
                res.status(200).send("User created")
            } else {
                res.status(400).send("This user already exists")
            }
        })
    })
}