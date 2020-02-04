module.exports = {
    tokenAdded: tokenAdded,
    insertInDb: insertInDb,
    addDeleteToken: addDeleteToken
}

function addDeleteToken(req, res, type, db) {
    if ((type === "added" || type === "updated") && (req.body.value === undefined || req.body.value === "")) {
        if (req.body.value === undefined || req.body.value === "") {
            console.log("Empty AccessToken", req.body.value)
        } else {
            console.log("Error server")
        }
        res.status(400).send("You can't put an empty value for the Access Token")
    } else {
        if (req.body.usertoken === undefined || req.body.usertoken === ""
            || req.body.servicename === undefined || req.body.servicename === "") {
            if (req.body.usertoken === undefined || req.body.usertoken === "") {
                console.log("Empty Username")
            } else {
                console.log("Empty servicename")
            }
            res.status(400).send("You can't send an empty field")
        } else {
            let userQuery = {
                userToken: req.body.usertoken
            }
            async function callAsync() {
                await insertInDb(userQuery, type, db, req, res, (arg) => {
                    if (arg === 0) {
                        tokenAdded(req.body.servicename, db, req.body.value)
                    }
                })
            }
            callAsync()
        }
    }
}

async function insertInDb(userQuery, type, db, req, res, callback) {
    db.collection("tokens").find(userQuery).toArray((err, result) => {
        console.log(userQuery)
        if (result[0] === undefined && type != "added") {
            res.status(403).send("You are not allowed to do this request")
            callback(1)
        } else {
            let update;
            if (type === "added" || type === "updated") {
                update = {
                    $set: {
                        [req.body.servicename.toLowerCase()]: req.body.value,
                        userToken: req.body.usertoken
                    }
                }
            } else {
                update = {
                    $unset: {
                        [req.body.servicename.toLowerCase()]: ""
                    }
                }
            }
            console.log(update)
            db.collection("tokens").updateOne(userQuery, update)
            res.status(200).send("Service " + req.body.servicename + " " + type)
            callback(0)
        }
    })
}

function tokenAdded(service, db, token) {
    console.log("COUCOU")
    if (service === "twitch") {
        console.log("COUCOU TWITCH")
    }
}
