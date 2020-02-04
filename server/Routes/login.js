var SUFFIX_SALT = "0ajkdf43s"
var PREFIX_SALT = "js92ndszz"
var sha256 = require('sha256');


module.exports = function (app, db) {
    app.post('/login', function (req, res) {
        if (req.body.username === "" || req.body.password === "") {
            res.status(400).send("You can't send an empty field")
            return;
        }
        db.collection("users").find({ username: req.body.username }).toArray(function (err, result) {
            let password = sha256(PREFIX_SALT + req.body.password + SUFFIX_SALT)
            if (result[0] === undefined) {
                res.status(400).send("This account doesn't exists")
            } else if (result[0].password !== password) {
                res.status(400).send("Passwords doesn't match")
            } else {
                res.set("UserToken", result[0].userToken)
                res.status(200).send("User connected!")
            }
        })
    })
}