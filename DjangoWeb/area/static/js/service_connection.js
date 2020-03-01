const services = ["spotify", "weather", "netflix", "gmail",
    "dropbox", "deezer",
    "twitter", "facebook", "amazon", "google-calendar",
    "google-drive", "instagram", "messenger", "microsoft-outlook",
    "nasa", "souncloud", "twitch", "trello", "pushbullet", "imgur", "football", "gitlab", "dribble"
]
const tab = {
    "dropbox": [{
        "name": "dropbox + nasa"
    }, {
        "name": "dropbox + imgur"
    }],
    "spotify": [{
        "name": "spotify + mail"
    }, {
        "name": "spotify + follow"
    }, {
        "name": "spotify + like"
    }, {
        "name": "spotify + concert"
    }],
    "trello": [{
        "name": "trello + gitlab"
    }],
    "imgur": [{
        "name": "imgur + dropbox"
    }, {
        "name": "imgur + TOTO"
    }],
    "nasa": [{
        "name": "nasa + dropbox"
    }, {
        "name": "nasa + mail"
    }, {
        "name": "nasa + imgur"
    }],
    "football": [{
        "name": "standings + pushbullet"
    }, {
        "name": "upcomingMatch + pushbullet"
    }],
    "pushbullet": [{
        "name": "pushbullet + standings"
    }, {
        "name": "pushbullet + upcomingMatch"
    }],
    "gitlab": [{
        "name": "gitlab + trello"
    }],
    "dribble": [{
        "name": "dribble + imgur"
    }],
}

var button = function createButton(name) {
    let myButton = document.createElement("button");
    myButton.className = "w3-button w3-black";
    let goto_button = "window.location.href='/Page/?" + "service=" + name.split(" + ")[0] + "&service2=" + name.split(" + ")[1] + "'";
    myButton.setAttribute("onclick", goto_button);
    myButton.innerHTML = name;
    return myButton;
}

function init(app_name) {
    var mydata;
    for (let i = 0; i != services.length; i++) {
        if (services[i] === app_name) {
            mydata = tab[services[i]];
        }
    }

    let buttons = document.getElementsByClassName("buttons")[0];

    mydata.forEach(element => {buttons.appendChild(button(element.name))});
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