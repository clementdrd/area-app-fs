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
                    res.status(404).send("Could not find an account that matches the token")
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


    function addDeleteToken(req, res, type) {
        if ((type === "added" || type === "updated") && (req.headers.value === undefined || req.headers.value === "")) {
            res.status(400).send("You can't put an empty value for the Access Token")
        } else {
            if (req.headers.usertoken === undefined || req.headers.usertoken === ""
                || req.headers.servicename === undefined || req.headers.servicename === "") {
                res.status(400).send("You can't send an empty field")
            } else {
                let userQuery = {
                    userToken: req.headers.usertoken
                }
                db.collection("tokens").find(userQuery).toArray((err, result) => {
                    if (result[0] === undefined) {
                        res.status(404).send("Could not find an account that matches the token")
                    } else {
                        let update;
                        if (type === "added" || type === "updated") {
                            update = {
                                $set: {
                                    [req.headers.servicename]: req.headers.value
                                }
                            }
                        } else {
                            update = {
                                $unset: {
                                    [req.headers.servicename]: ""
                                }
                            }
                        }
                        db.collection("tokens").updateOne(userQuery, update)
                        res.status(200).send("Service " + type)
                    }
                })
            }
        }
    }

    app.put("/updateAccessToken", (req, res) => {
        addDeleteToken(req, res, "updated")
    })

    app.post("/addAccessToken", (req, res) => {
        addDeleteToken(req, res, "added")
    })

    app.delete("/removeAccessToken", (req, res) => {
        addDeleteToken(req, res, "deleted")
    })
}