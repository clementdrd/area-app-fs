module.exports = function (app, db) {
    app.get("/register", function (req, res) {
        db.collection("users").insert({ name: "Axel" })
        res.send(200, "User created")
    })
}