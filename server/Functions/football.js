const fetch = require("node-fetch");
var request = require('request');

module.exports = function (app, db) {
    app.get('/premier_league_schedule_sms', function (req, res) {
        if (req.headers.usertoken == undefined || req.headers.usertoken == "") {
            res.status(401).send("Unauthorized")
        }
        else {
            get_premier_league_standing()
            res.status(200).send('Activated');
        }
    })
}

function get_premier_league_standing()
{
    var standings = []
    var url = "https://api.football-data.org/v2/competitions/2021/standings?standingType=HOME"
    var myHeaders = {
        'X-Auth-Token': '75c608bc71f44857973e61ebd74989f3'
    };
    var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' 
            };
    fetch(url, myInit)
    .then(res => {
        return res.json()
    })
    .then((json) => {
        for (i = 0; i != json.standings[0].table.length; i++) {
            // console.log(json.standings[0].table[i].position + ": " + json.standings[0].table[i].team['name'])
            standings.push(json.standings[0].table[i].position + ": " + json.standings[0].table[i].team['name'])
            // console.log(json.standings[0].table[i].team['name'])
        }
        return standings
        // SendGifToDropbox(json.data[0]["images"][0]['link'], access_token);
    })
    .then((standings) => {
        console.log(standings)
    })
}

function sendSMS(standings)
{
    
}