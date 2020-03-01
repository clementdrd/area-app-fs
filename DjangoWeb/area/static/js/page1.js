const reaction = {
    "dropbox + nasa": "/send_nasa_pic_to_dropbox",
    "nasa + dropbox": "/send_nasa_pic_to_dropbox",

    "nasa + mail": "/nasadaily",

    "dropbox + imgur": "/send_best_img_pic_to_dropbox",
    "imgur + dropbox": "/send_best_img_pic_to_dropbox",

    "nasa + imgur": "/imgurnasadaily",
    "imgur + nasa": "/imgurnasadaily",

    "dribble + imgur": "/dribblepost",
    "imgur + dribble": "/dribblepost",

    "imgur + imgur": "/ImgurFavorites",

    "spotify + mail": "/spotifyresume",

    "spotify + spotify": "/spotifyhistory",

    "trello + gitlab": "/trelloGitlabOrga",
    "gitlab + trello": "/trelloGitlabOrga",

    "pushbullet + standings": "/premier_league_schedule_sms",
    "standings + pushbullet": "/premier_league_schedule_sms",

    "pushbullet + upcomingMatch": "/upcoming_match",
    "upcomingMatch + pushbullet": "/upcoming_match",
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

    return false;
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

var i = 0;

function doOnClick() {

    if (i == 0) {
        document.getElementById('switch_text').value = 'Connected';
        i = 1;
        set_connected()


    } else {
        document.getElementById('switch_text').value = 'Disconnected';
        i = 0;
    }

    return false;

}

Dynamic_Text()