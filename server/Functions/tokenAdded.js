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
        if (req.body.userToken === undefined || req.body.userToken === ""
            || req.body.serviceName === undefined || req.body.serviceName === "") {
            if (req.body.userToken === undefined || req.body.userToken === "") {
                console.log("Empty Username")
            } else {
                console.log("Empty serviceName")
            }
            res.status(400).send("You can't send an empty field")
        } else {
            let userQuery = {
                userToken: req.body.userToken
            }
            async function callAsync() {
                await insertInDb(userQuery, type, db, req, res, (arg) => {
                    if (arg === 0) {
                        tokenAdded(req.body.serviceName, db, req.body.value)
                    }
                })
            }
            callAsync()
        }
    }
}

async function insertInDb(userQuery, type, db, req, res, callback) {
    db.collection("tokens").find(userQuery).toArray((err, result) => {
        if (result[0] === undefined) {
            res.status(403).send("You are not allowed to do this request")
            callback(1)
        } else {
            let update;
            if (type === "added" || type === "updated") {
                update = {
                    $set: {
                        [req.body.serviceName.toLowerCase()]: req.body.value
                    }
                }
            } else {
                update = {
                    $unset: {
                        [req.body.serviceName.toLowerCase()]: ""
                    }
                }
            }
            db.collection("tokens").updateOne(userQuery, update)
            res.status(200).send("Service " + req.body.serviceName + " " + type)
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
