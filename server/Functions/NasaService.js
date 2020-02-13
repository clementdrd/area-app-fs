const fetch = require("node-fetch");
const Mail  = require("./sendEmail")

module.exports = function (app, db) {
    app.get('/nasadaily', function (req, res) {
        if (req.headers.usertoken === undefined || req.headers.usertoken === "") {
            res.status(401).send("Unauthorized")
        }
        NasaDaily(req.headers.usertoken, db)
        res.status(200).send('Activated');
    })
}

function NasaDaily(result, db)
{
    var url = "https://api.nasa.gov/planetary/apod?api_key=6MpjO3T3rsOcQTm1JX8ah4JtL23PEVhfJW1t6PXG"
    
    fetch(url, { method: 'GET'})
    .then(res => {
        //console.log(res);
        return res.json()
    })
    .then((json) => {
    console.log(json);
    PrepareMail(json, result, db);
    }).catch((err) => {console.log(err)});
}

function PrepareMail(json, token, db)
{
    let mail = new Mail
    let test = "This is the daily Image of the nasa\n"
    db.collection("users").find({userToken: token}).toArray(function(err, result)
    {
        mail.sendEmail(result[0].email, "AREA image of the day Nasa",json.explanation + "\n\n"+  json.hdurl);
    })
}