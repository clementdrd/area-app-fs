const fetch = require("node-fetch");

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
                if (req.body.servicename.toLowerCase() === "google") {
                    var value = TreatGoogle(req)
                    req.body.value = value
                }
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

function TreatGoogle(req)
{
    var url = "https://oauth2.googleapis.com/token"
   
    var body =  JSON.stringify({ 
        code:req.body.value,
        client_id:"1053737486062-pdkrjca280v384pk79hv9vndr0df3kgl.apps.googleusercontent.com",
        client_secret:"buBUasroJf0i4Sp3UnGGHUu7",
        redirect_uri:"http://localhost:8080",
        grant_type:"authorization_code"
    })
    return fetch(url, { method: 'POST', body: body})
    .then(res => {
        console.log(res);
        return res.json()
    })
    .then((json) => {
        return json
    }).catch((err) => {console.log(err)});
}

async function insertInDb(userQuery, type, db, req, res, callback) {
    db.collection("tokens").find(userQuery).toArray((err, result) => {
        console.log(userQuery)
        if (result[0] === undefined || type != "added") {
            res.status(403).send("You are not allowed to do this request")
            callback(1)
        } else {
            let update;
            if (type === "added" || type === "updated") {
                if (req.body.servicename.toLowerCase() != "dribble")
                    update = {
                        $set: {
                            [req.body.servicename.toLowerCase()]: req.body.value,
                            userToken: req.body.usertoken
                        }
                    }
                else 
                    authHandler(req, db, userQuery)
            } else {
                update = {
                    $unset: {
                        [req.body.servicename.toLowerCase()]: ""
                    }
                }
            }
            console.log(update)
            if (req.body.servicename.toLowerCase() != "dribble")
                db.collection("tokens").updateOne(userQuery, update)
            res.status(200).send("Service " + req.body.servicename + " " + type)
            callback(0)
        }
    })
}

function authHandler(req, db, userQuery)
{
    
    var url = "https://dribbble.com/oauth/token?client_id=f5f8a1979f1e7dc4cb0a06a8199e9b36db59a3f66733bff33ad44163a0d1e154&client_secret=9ca54d1ea4a3000d62c71a01313dcba5d6c5ad06d2f55ec9c7dd0e91c56ef17d&code="+req.body.value+"&redirect_uri=https://area/"
    
    return fetch(url, { method: 'POST'})
    .then(res => {
        return res.json()
    })
    .then((json) => {
        update = {
            $set: {
                [req.body.servicename.toLowerCase()]: json.access_token,
                userToken: req.body.usertoken
            }
        }
        db.collection("tokens").updateOne(userQuery, update)
        return json.access_token
    }).catch((err) => {console.log(err)});
}

function tokenAdded(service, db, token) {
    if (service === "twitch") {
        console.log("COUCOU TWITCH")
    }
}
