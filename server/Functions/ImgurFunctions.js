const fetch = require("node-fetch");
const FormData = require("form-data")


module.exports = {
    TOImgur :TOImgur
}

function TOImgur(db)
{
    db.collection("users").find({}).toArray(function(err, result) {
        result.forEach(element => {
            db.collection("Services").find({userToken: element.userToken}).toArray(function(err, test) {
                
                if (test[0] != undefined) {
                    
                    if (test[0].imgurnasa == true) {
                        console.log("name" + element.email)
                        getNasa(element.imgur, db);
                    }
                }
            })
        });

    });
}

function ImgurPostNasa(token, db, nasaPic)
{
    let formData = new FormData();

    console.log(nasaPic);
    db.collection("tokens").find({userToken: token}).toArray(function(err, result) {
        console.log(result[0])
        var url ='https://api.imgur.com/3/upload';
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