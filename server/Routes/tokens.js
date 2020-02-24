var fct = require("../Functions/tokenAdded")
var Token = require("../Functions/getToken")

module.exports = function (app, db) {
    app.get("/getAccessToken", (req, res) => {
        if (req.headers.usertoken === undefined || req.headers.usertoken === ""
            || req.headers.servicename === undefined || req.headers.servicename === "") {
            res.status(400).send("You can't send an empty field")
        } else {
            
        }

    })

    app.put("/updateAccessToken", (req, res) => {
        fct.addDeleteToken(req, res, "updated", db)
    })

    app.post("/addAccessToken", (req, res) => {
        fct.addDeleteToken(req, res, "added", db)
    })

    app.delete("/removeAccessToken", (req, res) => {
        fct.addDeleteToken(req, res, "deleted", db)
    })

    app.get("/getAllServices", (req, res) => {
        if (req.headers.usertoken === undefined || req.headers.usertoken === "") {
            res.status(400).send("You can't send an empty field")
        } else {
            db.collection("tokens").find({
                userToken: req.headers.usertoken
            }).toArray(function (err, result) {
                if (result[0] === undefined) {
                    res.status(403).send("Could not find an account that matches the token")
                } else {
                    res.set("Content-Type", "application/json")
                    let service = []
                    for (serviceName in result[0]) {
                        if (serviceName !== "_id" && serviceName !== "userToken") {
                            service.push(serviceName)
                        }
                    }
                    res.status(200).send({ Service: service })
                }
            })
        }

    })
}
