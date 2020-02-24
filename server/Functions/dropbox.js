const fetch = require("node-fetch");
const dropboxV2Api = require('dropbox-v2-api');
const token = require("../Functions/DribbleFunctions")

module.exports = function (app, db) {
    app.get('/send_nasa_pic_to_dropbox', function (req, res) {
        if (req.headers.usertoken == undefined || req.headers.usertoken == "") {
            res.status(401).send("Unauthorized")
        }
        else {
            NasaFileHistory(req.headers.usertoken)
            res.status(200).send('Activated');
        }
    })
}

function NasaFileHistory(usertoken)
{
    var url = "https://api.nasa.gov/planetary/apod?api_key=6MpjO3T3rsOcQTm1JX8ah4JtL23PEVhfJW1t6PXG"
    
    fetch(url, { method: 'GET'})
    .then(res => {
        return res.json()
    })
    .then((json) => {
    console.log(json);
    PrepareMail(json, usertoken);
    }).catch((err) => {console.log(err)});
}

function PrepareMail(json, usertoken)
{
    // let mail = new Mail
    // let test = "This is the daily Image of the nasa\n"
    var url = "https://area-rest-api-zuma.herokuapp.com/getAccessToken?usertoken=" + usertoken + "&servicename=dropbox"

    fetch(url, { method: 'GET'})
    .then(res => {
        return res.json()
    })
    .then((json) => {
        console.log(json);
    })
    // const dropbox = dropboxV2Api.authenticate({
    //     token: 'your token'
    // });
    // console.log(json.url)
    // db.collection("users").find({userToken: token}).toArray(function(err, result)
    // {
    //     mail.sendEmail(result[0].email, "AREA image of the day Nasa",json.explanation + "\n\n"+  json.hdurl);
    // })
}