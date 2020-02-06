const usertoken = getCookie('userToken')

const redirect_link = {
    "spotify": "https://accounts.spotify.com/authorize?client_id=f6349b82adab4d12a42520ae5f530830&redirect_uri=http:%2F%2Flocalhost:8000%2F&scope=user-read-currently-playing%20user-read-email&response_type=token&state=123",
    "twitch": "https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=r5m2lcovdhgyv84zmu82utry0jtn5i&redirect_uri=http:%2F%2Flocalhost:8000%2F",
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

function delete_cookie( name, path, domain ) {
    console.log(getCookie('userToken'))
    if (get_cookie('userToken')) {
        document.cookie = name + "=" +
        ((path) ? ";path="+path:"")+
        ((domain)?";domain="+domain:"") +
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
    console.log(getCookie('userToken'))
    console.log("salut les amis")
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
    console.log(usertoken)
    if (usertoken) {
        service = findGetParameter('service')
        $.ajax({
            url: "https://area-rest-api-zuma.herokuapp.com/getAllServices",
            headers: {"usertoken": usertoken},
            success: function (result) {
                console.log(result)
                try {
                    result['service'].includes(service)
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

function Access_Token(lien) {
    service = findGetParameter('service')
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
                if (params.access_token === undefined) {
                } else {
                    spotify_auth.close()
                    clearInterval(interval)
                    $.ajax({
                        url: "https://area-rest-api-zuma.herokuapp.com/addAccessToken",
                        headers: {
                            "usertoken": usertoken,
                            "servicename": service,
                            "value": params.access_token
                        },
                        success: function() {
                            // spotify_auth.close()
                            // clearInterval(interval)
                        },
                         error: function (error) {
                             alert(error)
                         }
                    })
                }
            }
        } catch (err) {
            console.log(err);
        }
    }, 1000)
}

checkService()