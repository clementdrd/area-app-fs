const fetch = require("node-fetch");
const FormData = require("form-data")


module.exports = {
    TOImgur :TOImgur,
    TOCommentImgur : TOCommentImgur
}

function TOImgur(db)
{
    db.collection("users").find({}).toArray(function(err, result) {
        result.forEach(element => {
            db.collection("Services").find({userToken: element.userToken}).toArray(function(err, test) {
                
                if (test[0] != undefined) {
                    
                    if (test[0].imgurnasa == true) {
                        console.log("name" + element.email)
                        getNasa(element.userToken, db);
                    }
                }
            })
        });
    });
}

function TOCommentImgur()
{
    db.collection("users").find({}).toArray(function(err, result) {
        result.forEach(element => {
            db.collection("Services").find({userToken: element.userToken}).toArray(function(err, test) {
                
                if (test[0] != undefined) {
                    
                    if (test[0].imgurComment == true) {
                        console.log("name" + element.email)
                        handleCommentImgur(element.userToken, db);
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

function handleCommentImgur(buffer, db)
{
        var headers = {
            'Authorization' : 'Bearer ' + buffer
        }
        getContentFromImgur(headers, resu[0].userToken, db)
}

function getContentFromImgur(headers, usertoken, db) {
    //console.log(usertoken)
    var url = 'https://api.imgur.com/3/account/me/favorites';

    fetch(url, {method : "GET", headers: headers})
    .then((res) => 
        res.json()
    ).then((res) => {
        console.log(res)
        let ids = []
        res.data.forEach(element => {
            ids.push(element.id)
        });
        console.log("UserFavorites = " + ids);
        db.collection("users").find({userToken: usertoken}).toArray(function(er, resu) {
            var actualFavorites = ids.length;
            
            if (actualFavorites > resu[0].favoriteimgur) {
                commentFavoriteImage(headers, ids);
                db.collection("users").updateOne({favoriteimgur: resu[0].favoriteimgur}, { $set: {favoriteimgur: actualFavorites } });
            }
        })
    })
}

function commentFavoriteImage(headers, ids) {
    var url = "https://api.imgur.com/3/comment";
    let formData = new FormData();
    formData.append("image_id", ids[0]);
    formData.append("comment", "I love this image!");
        
    fetch(url, {method : "POST", headers: headers, body: formData})
    .then((res) => {
        if (res.status === 200) {
            return res;
        } else {
            console.log(res.error.status, res.error.message)
        }
    })
}