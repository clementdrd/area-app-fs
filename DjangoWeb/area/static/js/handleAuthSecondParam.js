const usertoken = getCookie('userToken')

const redirect_link = {
    "spotify": "https://accounts.spotify.com/authorize?client_id=f6349b82adab4d12a42520ae5f530830&redirect_uri=http:%2F%2Flocalhost:8000%2F&scope=user-read-currently-playing%20user-read-email&response_type=token&state=123",
    "twitch": "https://id.twitch.tv/oauth2/authorize?client_id=5nnkmcrbqaxrv1irgdqpten4rcnhr2&redirect_uri=http:%2F%2Flocalhost:8000%2F&response_type=token&scope=user:edit",
    "dropbox": "https://www.dropbox.com/oauth2/authorize?client_id=yp5wl24jy9d6l8l&response_type=token&redirect_uri=http:%2F%2Flocalhost:8000%2F",
    "pushbullet": "https://www.pushbullet.com/authorize?client_id=R3ame1lmBzYYVzkQ9IvaVhF1XtRucYJQ&redirect_uri=http%3A%2F%2Flocalhost%3A8000&response_type=token&scope=everything"
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
      user = prompt("Please enter your name:", "");
      if (user != "" && user != null) {
        setCookie("username", user, 365);
      }
    }
}

function delete_cookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
        location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
            });
    return result;
}

function checkService() {
    if (usertoken) {
        console.log(usertoken)
        service = findGetParameter('service2')
        if (service in redirect_link) {
            $.ajax({
                url: "https://area-rest-api-zuma.herokuapp.com/getAllServices",
                headers: {"usertoken": usertoken},
                success: function (result) {
                    console.log(result)
                    console.log(service)
                    try {
                        if (!result['Service'].includes(service)) {
                            Access_Token(redirect_link[service])                        
                        }
                    }
                    catch {
                        Access_Token(redirect_link[service])
                    }
                },
                error: function (error) {
                    alert(error)
                }
            })
        }
    }
}

function Access_Token(lien) {
    service = findGetParameter('service')
    let access_token
    let spotify_auth = window.open(
        lien,
        service + " auth",
        "resizable,scrollbars,status,location=yes,height=600,width=800,_blank",
    )
    var interval = setInterval(() => {
        try {
            if (spotify_auth.closed) {
                clearInterval(interval)
            } else {
                var regex = /[?#&]([^=#]+)=([^&#]*)/g,
                    params = {},
                    match;
                while (match = regex.exec(spotify_auth.location)) {
                    params[match[1]] = match[2];
                }
                if (params.access_token === undefined && params.code === undefined){
                    if ((service === "dropbox" && params.code === undefined) || service !== "dropbox") {
                        spotify_auth.close()
                        clearInterval(interval)
                    }
                } else {
                    spotify_auth.close()
                    clearInterval(interval)
                    access_token = params.access_token
                    console.log("usertoken: " + usertoken)
                    console.log("servicename: " + service)
                    console.log("value: " + access_token)
                    $.post( "https://area-rest-api-zuma.herokuapp.com/addAccessToken", 
                    {
                        "usertoken": usertoken, "servicename": service, "value": access_token
                    }).done(function(response) {
                        console.log(response)
                    });
                }
            }
        } catch (err) {
            console.log(params)
            console.log(err);
        }
    }, 1000)
}

checkService()