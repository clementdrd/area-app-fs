const fetch = require("node-fetch");
var request = require('request');


module.exports = {
    TODropbox : TODropbox
}

function TODropbox(db)
{
    db.collection("users").find({}).toArray(function(err, result) {
        result.forEach(element => {
            db.collection("Services").find({userToken: element.userToken}).toArray(function(err, test) {
                
                if (test[0] != undefined) {
                    
                    if (test[0].dropboxbestimage == true) {
                        db.collection("tokens").find({userToken: element.usertoken}).toArray((err, result2) => {
                            NasaFileHistory(result2[0].dropbox)
                        })
                    }else if (test[0].nasafilehistory == true) {
                        db.collection("tokens").find({userToken: element.usertoken}).toArray((err, result2) => {
                            ImgurBestImage(result2[0].dropbox)
                        })
                    }
                }
            })
        });
    });
}

function ImgurBestImage(access_token)
{
    var url = "https://api.imgur.com/3/gallery/search/hot/week?q=ext: gif"
    var myHeaders = {
        "Authorization": 'Client-ID 832c0fa8c4eb16e'
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
        console.log(json.data[0]["images"][0]['link'])
        SendGifToDropbox(json.data[0]["images"][0]['link'], access_token);
    })
    .catch((err) => {console.log(err)});
}

function NasaFileHistory(access_token)
{
    var url = "https://api.nasa.gov/planetary/apod?api_key=6MpjO3T3rsOcQTm1JX8ah4JtL23PEVhfJW1t6PXG"
    
    fetch(url, { method: 'GET'})
    .then(res => {
        return res.json()
    })
    .then((json) => {
        console.log(json.url)
        SendPictureToDropbox(json, access_token);
    })
    .catch((err) => {console.log(err)});
}

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}

function SendGifToDropbox(json, access_token)
{
    var headers = {
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json'
    };
    var dataString = '{"path": "/gif_of_the_week.gif","url": "' + json + '"}';
    console.log(dataString)
    
    var options = {
        url: 'https://api.dropboxapi.com/2/files/save_url',
        method: 'POST',
        headers: headers,
        body: dataString
    };
    request(options, callback);
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
}