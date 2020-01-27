var fct = require("../Functions/tokenAdded")

module.exports = function (app, db) {
    app.get("/getAccessToken", (req, res) => {
        if (req.headers.usertoken === undefined || req.headers.usertoken === ""
            || req.headers.servicename === undefined || req.headers.servicename === "") {
            res.status(400).send("You can't send an empty field")
        } else {
            db.collection("tokens").find({
                userToken: req.headers.usertoken
            }).toArray(function (err, result) {
                if (result[0] === undefined) {
                    res.status(403).send("Could not find an account that matches the token")
                } else {
                    if (result[0][req.headers.servicename] === undefined) {
                        res.status(422).send("The service " + req.headers.servicename + " has not been initiated for this user")
                    } else {
                        res.set("serviceToken", result[0][req.headers.servicename])
                        res.status(200).send("Success")
                    }
                }
            })
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
                    console.log(service)
                    res.status(200).send({ Service: service })
                }
            })
        }

    })
}