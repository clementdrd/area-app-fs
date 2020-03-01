const reaction = {
    "dropbox + nasa": ["/send_nasa_pic_to_dropbox", "nasafilehistory"],
    "nasa + dropbox": ["/send_nasa_pic_to_dropbox", "nasafilehistory"],

    "nasa + mail": ["/nasadaily", "nasa"],

    "dropbox + imgur": ["/send_best_img_pic_to_dropbox", "dropboxbestimage"],
    "imgur + dropbox": ["/send_best_img_pic_to_dropbox", "dropboxbestimage"],

    "nasa + imgur": ["/imgurnasadaily", "imgurnasa"],
    "imgur + nasa": ["/imgurnasadaily", "imgurnasa"],

    "dribble + imgur": ["/dribblepost", "dribblepost"],
    "imgur + dribble": ["/dribblepost", "dribblepost"],

    "imgur + imgur": ["/ImgurFavorites", "imgurComment"],

    "spotify + mail": ["/spotifyresume", "spotifyresume"],

    "spotify + like": ["/spotifyhistory", "spotifylike"],
    "spotify + concert": ["/spotifyhistory", "spotifyconcert"],
    "spotify + follow": ["/spotifyhistory", "spotifyfollow"],

    "trello + gitlab": ["/trelloGitlab", "trellogitlab"],
    "gitlab + trello": ["/gitlabTrello", "gitlabtrello"],

    "pushbullet + standings": ["/premier_league_schedule_sms", "premiereleague"],
    "standings + pushbullet": ["/premier_league_schedule_sms", "premiereleague"],

    "pushbullet + upcomingMatch": ["/upcoming_match", "upcomingmatch"],
    "upcomingMatch + pushbullet": ["/upcoming_match", "upcomingmatch"],
}

var i = 0;

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

function Dynamic_Text() {
    var href = window.location.href;
    var toto = href.split('?')
    console.log(href)
    console.log(toto)
    toto = toto[1].split('&')
    var frst_service = toto[0].split("=") ;
    var scnd_service = toto[1].split("=");
    console.log(frst_service)
    console.log(scnd_service)
    document.getElementById('main_text').value = scnd_service[1] + ' + ' + frst_service[1];
    check_if_service_is_connected()
}

function check_if_service_is_connected()
{
    let splited = window.location.href.split('?')
    let services_name = splited[1].split('&')
    var service_name1 = services_name[0].split('=')[1]
    var service_name2 = services_name[1].split('=')[1]
    var combined_service = service_name1 + " + " + service_name2
    let usertoken = getCookie("userToken")
    $.ajax({
        url: "https://area-rest-api-zuma.herokuapp.com/isActivated",
        headers: {"usertoken": usertoken},
        success: function (result) {
            if (result[0][reaction[combined_service][1]]) {
                document.getElementById("toggleSwitch").checked = true;
                document.getElementById('switch_text').value = 'Connected';
                i = 1
            }
        },
        error: function (error) {
            alert(error)
        }
    })
}

function request_the_server()
{
    let splited = window.location.href.split('?')
    let services_name = splited[1].split('&')
    var service_name1 = services_name[0].split('=')[1]
    var service_name2 = services_name[1].split('=')[1]
    var combined_service = service_name1 + " + " + service_name2
    let usertoken = getCookie("userToken")
    $.ajax({
        url: "https://area-rest-api-zuma.herokuapp.com" + reaction[combined_service][0],
        headers: {"usertoken": usertoken},
        success: function (result) {
            console.log("https://area-rest-api-zuma.herokuapp.com" + reaction[combined_service][0])
            console.log(result)
            document.getElementById('switch_text').value = 'Connected';
            i = 1;
        },
        error: function (error) {
            alert(error)
        }
    })
}

function set_connected() {
    var mydata = JSON.parse(youtube);
    var href = window.location.href;
    var splited = href.split('?')
    var service_name = splited[1].split("_").join(" ");
    console.log("recup service name" + service_name);
    console.log("mydata[0].name" + mydata[0].name);
    console.log("mydata[1].name" + mydata[1].name);

    if (service_name == mydata[0].name) {
        mydata[0].state = 'true';
        console.log(mydata[0].state);
        console.log("WAHOUUU");
    } else if (service_name == mydata[1].name) {
        console.log("LOLOLOL");
        mydata[1].state = 'true';
        console.log(mydata[1].state);

    }

    return false;
}

function doOnClick() {

    if (i == 0) {
        request_the_server()
    } else {
        document.getElementById('switch_text').value = 'Disconnected';
        i = 0;
    }

    return false;

}

Dynamic_Text()