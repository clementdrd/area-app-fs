var SUFFIX_SALT = "0ajkdf43s"
var PREFIX_SALT = "js92ndszz"
var sha256 = require('sha256');

module.exports = function (app, db) {
    db.collection("users").find({ username: "admin", admin: true }).toArray(function (err, result) {
        if (result[0] === undefined) {
            db.collection("users").insertOne(
                {
                    username: "admin",
                    password: sha256(SUFFIX_SALT + "admin" + PREFIX_SALT),
                    email: "matthieu.correia-moreira@epitech.eu",
                    admin: true
                })
        }
    })
}