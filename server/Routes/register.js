module.exports = function (app, db) {
    app.post("/register", function (req, res) {
        // console.log(req.body)
        db.collection("users").find({name: req.body.name}).toArray(function(err, result) {
            console.log(result[0])
            if (result[0] === undefined) {
                db.collection("users").insert(req.body)
                res.send(200, "User created")
            } else {
                res.send(402, "User already exists")
            }
        })
    })
}