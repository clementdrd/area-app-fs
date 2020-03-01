const services = ["spotify", "weather", "netflix", "gmail",
                  "dropbox", "deezer",
                  "twitter", "facebook", "amazon", "google-calendar",
                  "google-drive", "instagram", "messenger", "microsoft-outlook",
                  "nasa", "souncloud", "twitch", "trello", "pushbullet", "imgur", "football", "gitlab", "dribble"]
const tab = {
    "dropbox": [{"name" : "dropbox + nasa"},{"name" : "dropbox + imgur"}],
    "spotify": [{"name" : "spotify + mail"},{"name" : "spotify + spotify"}],
    "trello": [{"name" : "trello + gitlab"}],
    "imgur": [{"name" : "imgur + dropbox"},{"name" : "imgur + TOTO"}],
    "nasa": [{"name" : "nasa + dropbox"},{"name" : "nasa + mail"}, {"name" : "nasa + imgur"}],
    "football": [{"name" : "standings + pushbullet"},{"name" : "upcomingMatch + pushbullet"}],
    "pushbullet": [{"name" : "pushbullet + standings"},{"name" : "pushbullet + upcomingMatch"}],
    "gitlab": [{"name" : "gitlab + trello"}],
    "dribble": [{"name" : "dribble + imgur"}],
}

function init(app_name) {
    var mydata;
    for (let i = 0; i != services.length; i++) {
        if (services[i] === app_name) {
            mydata = tab[services[i]];
        }
    }
    console.log(mydata[0])
    document.getElementById('button1').innerHTML = mydata[0]["name"];
    
    var button_1_url = (mydata[0]["name"]).split(" ").join("_");
    if (app_name !== "gitlab" || app_name !== "trello")
        var button_2_url = (mydata[1]["name"]).split(" ").join("_");

    var url1 = button_1_url.split("_+_");
    if (app_name !== "gitlab" || app_name !== "trello")
        var url2 = button_2_url.split("_+_");


    var goto_button1 = "window.location.href='/Page/?" + "service=" + url1[0] + "&service2=" + url1[1] + "'";
    if (app_name !== "gitlab" || app_name !== "trello")
        var goto_button2 = "window.location.href='/Page/?" + "service=" + url2[0] + "&service2=" + url2[1] + "'";

    var foo = document.getElementById("button1");
    foo.setAttribute("onclick", goto_button1);

    var foo = document.getElementById("button2");
    if (app_name !== "gitlab" || app_name !== "trello") {
        foo.setAttribute("onclick", goto_button2);
        document.getElementById('button2').innerHTML = mydata[1]["name"];
    }
    else {
        document.getElementById('button2').style.display = "none";
    }
}

function change_logo() {
    var href = window.location.href;
    var app_name = href.split('=');

    var x = document.getElementsByTagName("img").item(0);
    var v = "";

    for (let i = 0; i != services.length; i++) {
        if (href.includes(services[i])) {
            v = "/static/images/icon/" + services[i] + "-icon.png";
        }
    }

    x.setAttribute("src", v);
    x.style.width = '18%';
    x.style.left = '0';

    init(app_name[1]);

}

change_logo()