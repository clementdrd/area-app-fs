const fetch = require("node-fetch");
const FormData = require("form-data")

module.exports = {
    getShots: getShots,
    TODribble : TODribble
}

function getShots(token, db)
{    
    db.collection("tokens").find({userToken: token}).toArray(function(err, result) {
        console.log(result[0])
        var url ="https://api.dribbble.com/v2/user/shots";
        var headers = {
            "Authorization": "Bearer " + result[0].dribble
        }
        
     
        fetch(url, { method: 'GET', headers: headers})
        .then(res => {
            console.log(res)
            if (res.status === 200) {
                return res.json()
            } else {
                console.log(res.error.status, res.error.message)
            }
        }).then (json => {
            if (json[0] != undefined)
                ImgurPost(token, db, json[0].images.normal)
        })
    })
}

function ImgurPost(token, db, nasaPic)
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

function TODribble(db)
{
    db.collection("users").find({}).toArray(function(err, result) {
        result.forEach(element => {
            db.collection("Services").find({userToken: element.userToken}).toArray(function(err, test) {
                
                if (test[0] != undefined) {
                    
                    if (test[0].dribble == true) {
                        console.log("name" + element.email)
                        getShots(element, db);
                    }
                }
            })
        });
    });
}