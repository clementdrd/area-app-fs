const fetch = require("node-fetch");
const dropboxV2Api = require('dropbox-v2-api');
var Token = require("../Functions/getToken")
var fs = require('fs');
var request = require('request');

module.exports = function (app, db) {
    app.get('/send_nasa_pic_to_dropbox', function (req, res) {
        if (req.headers.usertoken == undefined || req.headers.usertoken == "") {
            res.status(401).send("Unauthorized")
        }
        else {
            // let token = new Token(db)
            db.collection("tokens").find({userToken: req.headers.usertoken}).toArray((err, result) => {
                NasaFileHistory(result[0].dropbox)
            })
            res.status(200).send('Activated');
        }
    })
}

function NasaFileHistory(access_token)
{
    console.log(access_token)
    var url = "https://api.nasa.gov/planetary/apod?api_key=6MpjO3T3rsOcQTm1JX8ah4JtL23PEVhfJW1t6PXG"
    
    fetch(url, { method: 'GET'})
    .then(res => {
        return res.json()
    })
    .then((json) => {
        console.log(json.url)
        SendPictureToDropbox(json, access_token);
    }).catch((err) => {console.log(err)});
}

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}

function SendPictureToDropbox(json, usertoken, access_token)
{
    var headers = {
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json'
    };
    var dataString = '{"path": "/picture_of_the_day.jpg","url": "' + json.url + '"}';
    console.log(dataString)
    
    var options = {
        url: 'https://api.dropboxapi.com/2/files/save_url',
        method: 'POST',
        headers: headers,
        body: dataString
    };
    request(options, callback);
    // dropbox({
    //     resource: 'files/upload',
    //     parameters: {
    //         path: json.url
    //     },
    //     readStream: fs.createReadStream(json.url)
    // }, (err, result, response) => {
    //     if (err) { return console.log(err); }
    //     console.log(result);
    // });
}