const fetch = require("node-fetch");

module.exports = function (app, db) {
    app.get('/spotifyhistory', function (req, res) {
        if (req.headers.usertoken === undefined || req.headers.usertoken === "") {
            res.status(401).send("Unauthorized")
        }
        SpotifyHistory(req.headers.usertoken, db)
        res.status(200).send('Activated');
    })
}

function SpotifyHistory(usertoken, db)
{
    db.collection("tokens").find({userToken: usertoken}).toArray(function(err, result) {
        console.log(result[0])
        var url ='https://api.spotify.com/v1/me/player/currently-playing';
        var headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + result[0].spotify
        }
        fetch(url, { method: 'GET', headers: headers})
        .then((res) => {
            console.log(res.code);
            res.json()
        })
        .then((json) => {
        console.log(json);
        // Do something with the returned data.
        }).catch((err) => {console.log(err)});
    })
}
 