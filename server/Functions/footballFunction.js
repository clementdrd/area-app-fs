const fetch = require("node-fetch");
var request = require('request');

module.exports = {
    TOFootBall : TOFootBall
}

function TOFootBall(db)
{
    db.collection("users").find({}).toArray(function(err, result) {
        result.forEach(element => {
            db.collection("Services").find({userToken: element.userToken}).toArray(function(err, test) {
                
                if (test[0] != undefined) {
                    
                    if (test[0].premierleague == true) {
                        get_premier_league_standing(element.userToken)
                    }else if (test[0].upcomingmatch == true) {
                        get_upcoming_match(element.userToken, db)
                    }
                }
            })
        });
    });
}

function get_upcoming_match(usertoken, db)
{
    var matches = []
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var date = new Date();
    date.setDate(date.getDate() + 7);
    var dd7 = String(date.getDate()).padStart(2, '0');
    var mm7 = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy7 = date.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    nextWeek = yyyy7 + '-' + mm7 + '-' + dd7;

    var url = 'https://api.football-data.org/v2/competitions/PL/matches?status=SCHEDULED&dateFrom=' + today + '&dateTo=' + nextWeek
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
    .then(json => {
        for (let i = 0; i < json.matches.length; i++) {
            var date = new Date(json.matches[i].utcDate);
            var dt = date.getDate();
            var month = date.getMonth()+1;
            var year = date.getFullYear();
            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }
            matches.push(json.matches[i].homeTeam.name + " vs " + json.matches[i].awayTeam.name)
            matches.push("date: " + dt + "/" + month + "/" + year)
        }
        console.log(matches)
    })
    sendSMS(usertoken, matches, db)
}

function get_premier_league_standing(usertoken, db)
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
            standings.push(json.standings[0].table[i].position + ": " + json.standings[0].table[i].team['name'])
        }
        return standings
    })
    .then((standings) => {
        sendSMS(usertoken, standings, db)
    })
}

function sendSMS(usertoken, standings, db)
{
    // var me = "o.IHsfX4kfjp0addDLDjEQXxGBfTBSSYaD"
    var url = 'https://api.pushbullet.com/v2/users/me'
    var myHeaders = {
        'Access-Token': 'o.IHsfX4kfjp0addDLDjEQXxGBfTBSSYaD'
    };
    var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' 
            };
    fetch(url, myInit)
    .then((res) => {
        return res.json()
    })
    .then((res) => {
        console.log(res.iden)
        var options = {
            'method': 'POST',
            'url': 'https://api.pushbullet.com/v2/ephemerals',
            'headers': {
              'Access-Token': 'o.IHsfX4kfjp0addDLDjEQXxGBfTBSSYaD',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"push":{"conversation_iden":"+33643142020","message":standings.join('\n'),"package_name":"com.pushbullet.android","source_user_iden":"ujAlU1gnioK","target_device_iden":"ujAlU1gnioKsjEw79BBUv6","type":"messaging_extension_reply"},"type":"push"})
          };
          request(options, function (error, response) { 
            if (error) throw new Error(error);
            console.log(response.body);
          });
          
    });
}