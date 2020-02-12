const fetch = require("node-fetch");
const FormData = require("form-data")

module.exports = function (app, db) {
    app.get('/imgurnasadaily', function (req, res) {
        if (req.headers.usertoken === undefined || req.headers.usertoken === "") {
            res.status(401).send("Unauthorized")
        }
        getNasa(req.headers.usertoken, db)
        res.status(200).send('Activated');
    })
}

function ImgurPostNasa(token, db, nasaPic)
{
    let formData = new FormData();

    console.log(nasaPic);
    db.collection("tokens").find({userToken: token}).toArray(function(err, result) {
        console.log(result[0])
        var url ='https://api.imgur.com/3/upload ';
        var headers = {
            "Authorization": "Bearer " + result[0].imgur
        }
        
        formData.append("image", nasaPic);
     
        fetch(url, { method: 'POST', headers: headers, body: formData})
        .then(res => {
            console.log(res)
            if (res.status === 200) {
                return res.json()
            } else {
                console.log(res.error.status, res.error.message)
            }
        })
    })
}

function getNasa(token, db)
{
    var url = "https://api.nasa.gov/planetary/apod?api_key=6MpjO3T3rsOcQTm1JX8ah4JtL23PEVhfJW1t6PXG"
    
    fetch(url, { method: 'GET'})
    .then(res => {
        return res.json()
    })
    .then((json) => {
        ImgurPostNasa(token, db, json.url)
    }).catch((err) => {console.log(err)});
}