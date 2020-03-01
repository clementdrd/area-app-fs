const fetch = require("node-fetch");
const Mail  = require("./sendEmail");


module.exports = {
    TOSpotify : TOSpotify
}

function TOSpotify(db)
{
    db.collection("users").find({}).toArray(function(err, result) {
        result.forEach(element => {
            db.collection("Services").find({userToken: element.userToken}).toArray(function(err, test) {
                
                if (test[0] != undefined) {
                    
                    if (test[0].spotifyresume == true)
                        SpotifyResume(element.userToken, db)
                    if (test[0].spotifylike)
                        SpotifyHistory(element.userToken, db, "like")
                    if (test[0].spotifyconcert){
                        SpotifyHistory(element.userToken, db, "concert")
                    } if (test[0].spotifyfollow) {
                        SpotifyHistory(element.userToken, db, "follow")
                    }
                }
            })
        });
    });
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
            //console.log("Json = ", json)
            if (mode == "like") {
                LikeSong(result, json.item.id)
            }else if(mode == "follow") {
                FollowArtist(result, json.artists[0].id)
            }else if (mode == "concert") {
                FindConcert(json.item.artists[0].name, result, db)
            }
        }).catch((err) => {console.log("Erreur = ", err)});
    })
}


function SpotifyResume(userToken, db)
{
    db.collection("tokens").find({userToken: userToken}).toArray(function(err, result) {
        Resume(result, db)
    })
}

function FindConcert(name, result, db)
{
    var url = "https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=Tm3jChaUAA0JNIY1iEM2WpkljGM3Dmuq&keyword=" + name
    fetch(url, { method: 'GET'})
    .then(res => {
        return res.json()
    })
    .then((json) => {
    SendConcertMail(json, result, name , db)
    // Do something with the returned data.
    }).catch((err) => {console.log(err)});
}

function SendConcertMail(json, tokens, name, db)
{
    let mail = new Mail
   
    db.collection("users").find({userToken: tokens[0].userToken}).toArray(function(err, result)
    {
        //console.log(name)
        mail.sendEmail(result[0].email, "Area " + name + "'s Concert", json._embedded.events[0].url);
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
    let first = "Your Top 10 most listened artists on spotify :\n"
    if (json.items == undefined)
        return
    db.collection("users").find({userToken: tokens[0].userToken}).toArray(function(err, result)
    {
        let name = json.items.reduce((acc, cur)=> acc + cur.name + "\n", "")
        //console.log(name)
        mail.sendEmail(result[0].email, "Area Top 10 Artists Spotify", first + name);
    })
}
