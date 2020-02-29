var SUFFIX_SALT = "0ajkdf43s"
var PREFIX_SALT = "js92ndszz"
var sha256 = require('sha256');

module.exports = function (app, db) {
    db.collection("users").find({ username: "admin", admin: true }).toArray(function (err, result) {
        if (result[0] === undefined) {
            db.collection("users").insertOne(
                {
                    username: "admin",
                    password: sha256(PREFIX_SALT + "admin" + SUFFIX_SALT),
                    email: "tom.robert@epitech.eu",
                    admin: true
                })
        }
    })
}