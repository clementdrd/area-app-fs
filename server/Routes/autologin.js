module.exports = function (app, db) {
    app.post("/autologin", (req, res) => {
        if (!req.body.usertoken) {
            db.collection("users").find({userToken : req.body.userToken}).toArray((err, result) => {
                if (result[0] === undefined || result[0] === null) {
                    res.status(200).send("Valid Token")
                } else {
                    res.status(422).send("Unprocessable Entity")
                }
            })
        } else {
            res.status(400).send("Invalid token")
        }
    })

}