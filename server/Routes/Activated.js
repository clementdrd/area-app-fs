module.exports = function (app, db) {
    app.get("/isActivated", (req, res) => {
        if (!req.headers.usertoken && req.headers.servicename) {
            db.collection("users").find({
                userToken: req.body.userToken
            }).toArray((err, result) => {
                if (result[0] === undefined || result[0] === null) {
                    db.colletion("Services").find({
                        userToken: req.body.userToken
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