const fetch = require("node-fetch");
const Mail  = require("./sendEmail")


module.exports = function (app, db) {
    app.get('/spotifyhistory', function (req, res) {
        if (req.headers.usertoken === undefined || req.headers.usertoken === "") {
            res.status(401).send("Unauthorized")
        }
        if (req.headers.mode === undefined || req.headers.mode === "")
            res.status(400).send("Bad Request")
        SpotifyHistory(req.headers.usertoken, db, req.headers.mode)
        res.status(200).send('Activated');
    })
    app.get('/spotifyresume', function (req, res) {
        if (req.headers.usertoken === undefined || req.headers.usertoken === "") {
            res.status(401).send("Unauthorized")
        }
        SpotifyResume(req.headers.usertoken, db)
        res.status(200).send('Activated');
    })
}

function SpotifyHistory(usertoken, db, mode)
{
    db.collection("tokens").find({userToken: usertoken}).toArray(function(err, result) {
        console.log(result[0])
        var url ='https://api.spotify.com/v1/me/player/currently-playing';
        var headers = {
            "Authorization": "Bearer " + result[0].spotify
        }
        fetch(url, { method: 'GET', headers: headers})
        .then(res => {
            if (res.status === 200) {
                 console.log(res)
                return res.json()
            } else {
                console.log(res.error.status, res.error.message)
            }
            //res.json()
        })
        .then((json) => {
            console.log("Json = ", json.item.id)
            if (mode == "like")
                LikeSong(result, json.item.id)
            else if(mode == "follow")
                FollowArtist(result, json.item.id)
        }).catch((err) => {console.log("Erreur = ", err)});
    })
}

function SpotifyResume(userToken, db)
{
    db.collection("tokens").find({userToken: userToken}).toArray(function(err, result) {
        Resume(result, db)
    })
}

function LikeSong(result, id)
{
    var url = "https://api.spotify.com/v1/me/tracks?ids=" + id
    var headers = {
        "Authorization": "Bearer " + result[0].spotify
    }
    fetch(url, { method: 'PUT', headers: headers})
    .then(res => {
        //console.log(res);
        //res.json()
    })
    .then((json) => {
    //console.log(json);
    // Do something with the returned data.
    }).catch((err) => {console.log(err)});
}

function FollowArtist(result, id)
{
    var url = "https://api.spotify.com/v1/me/following?type=artist&ids=" + id
    var headers = {
        "Authorization": "Bearer " + result[0].spotify
    }
    fetch(url, { method: 'PUT', headers: headers})
    .then(res => {
        //console.log(res);
        //res.json()
    })
    .then((json) => {
    //console.log(json);
    // Do something with the returned data.
    }).catch((err) => {console.log(err)});
}
 

function Resume(result, db)
{
    var url = "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10"
    var headers = {
        "Authorization": "Bearer " + result[0].spotify
    }
    fetch(url, { method: 'GET', headers: headers})
    .then(res => {
        console.log(res);
        //res.json()
        return res.json()
    })
    .then((json) => {
        console.log(json)
        PrepareMail(json, result, db);
    }).catch((err) => {console.log(err)});
}

function PrepareMail(json, tokens, db)
{
    let mail = new Mail
    let test = "Your Top 10 most listened artists on spotify :\n"
    db.collection("users").find({userToken: tokens[0].userToken}).toArray(function(err, result)
    {
        mail.sendEmail(result[0].email, "Area Top 10 Artists Spotify",json.items.forEach(element => test = test + element.name + "\n" ));
    })
}