const services = ["spotify", "weather", "netflix", "gmail",
                  "dropbox", "deezer",
                  "twitter", "facebook", "amazon", "google-calendar",
                  "google-drive", "instagram", "messenger", "microsoft-outlook",
                  "nasa", "souncloud", "twitch", "trello", "pushbullet", "imgur", "football"]
const tab = {
    "dropbox": [{"name" : "Dropbox + TOTO", "state" : "false"},{"name" : "Dropbox + TOTO", "state" : "false"}],
    "spotify": [{"name" : "Spotify + TOTO", "state" : "false"},{"name" : "Spotify + TOTO", "state" : "false"}],
    "trello": [{"name" : "Trello + TOTO", "state" : "false"},{"name" : "Trello + TOTO", "state" : "false"}],
    "imgur": [{"name" : "Imgur + TOTO", "state" : "false"},{"name" : "Imgur + TOTO", "state" : "false"}],
    "nasa": [{"name" : "Nasa + TOTO", "state" : "false"},{"name" : "Nasa + TOTO", "state" : "false"}],
    "football": [{"name" : "Football + TOTO", "state" : "false"},{"name" : "Football + TOTO", "state" : "false"}],
    "pushbullet": [{"name" : "Football + TOTO", "state" : "false"},{"name" : "Football + TOTO", "state" : "false"}],
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
    var button_2_url = (mydata[1]["name"]).split(" ").join("_");

    var url1 = button_1_url.split("_+_");
    var url2 = button_2_url.split("_+_");


    var goto_button1 = "window.location.href='/Page?" + "service=" + url1[0] + "?service2=" + url1[1] + "'";
    var goto_button2 = "window.location.href='/Page?" + "service=" + url2[0] + "?service2=" + url2[1] + "'";

    var foo = document.getElementById("button1");
    foo.setAttribute("onclick", goto_button1);

    var foo = document.getElementById("button2");
    foo.setAttribute("onclick", goto_button2);

    document.getElementById('button2').innerHTML = mydata[1]["name"];
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