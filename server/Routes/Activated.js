module.exports = function (app, db) {
    app.get("/isActivated", (req, res) => {
        if (req.headers.usertoken) {
            db.collection("users").find({
                userToken: req.headers.usertoken
            }).toArray((err, result) => {
                if (result[0] !== undefined || result[0] !== null) {
                    db.collection("Services").find({
                        userToken: req.headers.usertoken
                    }).toArray((error, services) => {
                        res.set("Content-Type", "application/json")
                        res.status(200).send(services)
                    })
                } else {
                    res.status(400).send("Account not found")
                }
            })
        } else {
            res.status(400).send("No Usertoken nor servicename")
        }
    })

}