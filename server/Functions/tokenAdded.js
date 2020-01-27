module.exports = {
    tokenAdded: tokenAdded,
    insertInDb: insertInDb,

    addDeleteToken : addDeleteToken
}

function addDeleteToken(req, res, type, db) {
    console.log(req.body)
    if ((type === "added" || type === "updated") && (req.headers.value === undefined || req.headers.value === "")) {
        console.log("Empty AccessToken")
        res.status(400).send("You can't put an empty value for the Access Token")
    } else {
        if (req.headers.usertoken === undefined || req.headers.usertoken === ""
            || req.headers.servicename === undefined || req.headers.servicename === "") {
            if (req.headers.usertoken === undefined || req.headers.usertoken === "") {
                console.log("Empty Username")
            } else {
                console.log("Empty serviceName")
            }
                res.status(400).send("You can't send an empty field")
        } else {
            let userQuery = {
                userToken: req.headers.usertoken
            }
            async function callAsync() {
                await insertInDb(userQuery, type, db, req, res, (arg) => {
                    if (arg === 0) {
                        tokenAdded(req.headers.servicename, db, req.headers.value)
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
            res.status(200).send("Service " + req.headers.servicename + " " + type)
            callback(0)
        }
    })
}

function tokenAdded(service, db, token){
    console.log("COUCOU")
    if (service === "twitch") {
        console.log("COUCOU TWITCH")
    }
}
