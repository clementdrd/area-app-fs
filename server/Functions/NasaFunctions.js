const fetch = require("node-fetch");
const Mail  = require("./sendEmail")


module.exports = {
    TONasa : TONasa,
    NasaDaily : NasaDaily
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
        mail.sendEmail(token.email, "AREA image of the day Nasa",json.explanation + "\n\n"+  json.hdurl);
    })
}

function TONasa(db)
{
    db.collection("users").find({}).toArray(function(err, result) {
        result.forEach(element => {
            db.collection("Services").find({userToken: element.userToken}).toArray(function(err, test) {
                
                if (test[0] != undefined) {
                    
                    if (test[0].nasa == true) {
                        console.log("name" + element.email)
                        NasaDaily(element, db);
                    }
                }
            })
        });

    });

}
