const usertoken = getCookie('userToken')

const redirect_uri = "http://" + "127.0.0.1" + ":8000/";

const redirect_link = {
    "spotify": "https://accounts.spotify.com/authorize?client_id=f6349b82adab4d12a42520ae5f530830&redirect_uri=" + redirect_uri + "&scope=user-read-currently-playing%20user-read-email&response_type=token&state=123",
    // "twitch": "https://id.twitch.tv/oauth2/authorize?client_id=5nnkmcrbqaxrv1irgdqpten4rcnhr2&redirect_uri=" + redirect_uri + "&response_type=token&scope=user:edit",
    "dropbox": "https://www.dropbox.com/oauth2/authorize?client_id=yp5wl24jy9d6l8l&response_type=token&redirect_uri=" + redirect_uri,
    "pushbullet": "https://www.pushbullet.com/authorize?client_id=R3ame1lmBzYYVzkQ9IvaVhF1XtRucYJQ&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000&response_type=token&scope=everything",
    "imgur": "https://api.imgur.com/oauth2/authorize?client_id=6c756bc671ff8b6&response_type=token",
    "gitlab": "https://gitlab.com/oauth/authorize?client_id=211e20b122dc89a8593c8b86ea7bd02b1242d09e264b8c9947577b8929f5a727&redirect_uri=" + redirect_uri + "&response_type=code&state=123&scope=api%20sudo",
    "trello": "https://trello.com/1/authorize/?key=51fa8f3fa712867ca344ee0bb04b1de0&name=area&response_type=token&expiration=never&callback_method=fragment&return_url=" + redirect_uri + "&scope=read,write",
    "dribble": "https://dribbble.com/oauth/authorize?client_id=f5f8a1979f1e7dc4cb0a06a8199e9b36db59a3f66733bff33ad44163a0d1e154&redirect_uri=" + redirect_uri + "&scope=public+upload&state=123"
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
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
        service = findGetParameter('service')
        if (service in redirect_link) {
            $.ajax({
                url: "https://area-rest-api-zuma.herokuapp.com/getAllServices",
                headers: {
                    "usertoken": usertoken
                },
                success: function (result) {
                    console.log(result)
                    console.log(service)
                    try {
                        if (!result['Service'].includes(service)) {
                            Access_Token(redirect_link[service])
                        }
                    } catch {
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
    console.log(service === "gitlab")
    if (service === "gitlab") {
        gitlabOauth(lien, service);
    } else {
        let Popup = window.open(
            lien,
            service + " auth",
            "resizable,scrollbars,status,location=yes,height=600,width=800,_blank",
        )
        var interval = setInterval(() => {
            try {
                if (Popup.closed) {
                    clearInterval(interval)
                } else {
                    console.log(Popup.location)
                    var regex = /[?#&]([^=#]+)=([^&#]*)/g,
                        params = {},
                        match;
                    while (match = regex.exec(Popup.location)) {
                        params[match[1]] = match[2];
                    }
                    console.log("PARAMS = ", params)
                    if (params.token !== undefined) {
                        params.access_token = params.token;
                    }
                    if (params.access_token === undefined && params.code === undefined) {
                        if ((service === "dropbox" && params.code === undefined) || service !== "dropbox") {
                            Popup.close()
                            clearInterval(interval)
                        }
                    } else {
                        Popup.close()
                        clearInterval(interval)
                        access_token = params.access_token
                        console.log("usertoken: " + usertoken)
                        console.log("servicename: " + service)
                        console.log("value: " + access_token)
                        $.post("https://area-rest-api-zuma.herokuapp.com/addAccessToken", {
                            "usertoken": usertoken,
                            "servicename": service,
                            "value": access_token
                        }).done(function (response) {
                            console.log(response)
                        });
                    }
                }
            } catch (err) {
                console.log(err)
                // console.log("Params = ", params)
            }
        }, 1000)
    }
}


function gitlabOauth(lien, service) {
    let Popup = window.open(
        lien,
        service + " auth",
        "resizable,scrollbars,status,location=yes,height=600,width=800,_blank",
    )
    var interval = setInterval(() => {
        try {
            if (Popup.closed) {
                clearInterval(interval)
            } else {
                let url = JSON.stringify(Popup.location.href)
                var regex = /[?#&]([^=#]+)=([^&#]*)/g,
                    params = {},
                    match;
                while (match = regex.exec(url)) {
                    params[match[1]] = match[2];
                }
                if (params.code === undefined) {
                    // Do Nothing
                } else {
                    let code = params.code.substring(0, params.code.length - 1)
                    let getToken = "https://gitlab.com/oauth/token?client_id=211e20b122dc89a8593c8b86ea7bd02b1242d09e264b8c9947577b8929f5a727&redirect_uri=" + redirect_uri + "&code=" + code + "&grant_type=authorization_code"
                    console.log(getToken);
                    fetch(getToken, {method : "POST", mode: "cors"})
                    // $.post(getToken).done(function (response) {
                    //     console.log(response)
                    // });
                    $.post("https://area-rest-api-zuma.herokuapp.com/addAccessToken", {
                        "usertoken": usertoken,
                        "servicename": service,
                        "value": access_token
                    }).done(function (response) {
                        Popup.close()
                        console.log(response)
                    })
                }
            }
        } catch {
            //TODO
        }
    }, 1000)
}

checkService()