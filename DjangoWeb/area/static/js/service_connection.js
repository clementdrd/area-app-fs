const services = ["spotify", "weather", "netflix", "gmail",
                  "dropbox", "deezer", "youtube", "whatsapp",
                  "twitter", "facebook", "amazon", "google-calendar",
                  "google-drive", "instagram", "messenger", "microsoft-outlook",
                  "nasa", "souncloud", "twitch"]
const tab = {
    "twitter": [{"name" : "Last Trend", "state" : "false"},{"name" : "Make a Tweet", "state" : "false"}],
    "youtube": [{"name" : "Newest Videos", "state" : "false"},{"name" : "Most Viewed", "state" : "false"}],
    "facebook": [{"name" : "Most liked Page", "state" : "false"},{"name" : "Random Videos", "state" : "false"}],
    "whatsapp": [{"name" : "Send Message", "state" : "false"},{"name" : "Make a call", "state" : "false"}],
    "amazon": [{"name" : "Email Order Status", "state" : "false"},{"name" : "Email New Deals", "state" : "false"}],
    "netflix": [{"name" : "News Movies Send By Mail", "state" : "false"},{"name" : "List All US Series", "state" : "false"}],
    "dropbox": [{"name" : "Synchronize", "state" : "false"},{"name" : "Synchronize", "state" : "false"}],
    "deezer": [{"name" : "Get All New French Music ", "state" : "false"},{"name" : "Send Your Playlist To Friends", "state" : "false"}],
    "gmail": [{"name" : "Receive Mail from Calendar", "state" : "false"},{"name" : "Send Daily Nasa Photos", "state" : "false"}],
    "spotify": [{"name" : "Get random music each day", "state" : "false"},{"name" : "Send best music of the month", "state" : "false"}],
    "twitch": [{"name" : "Get random streamer", "state" : "false"},{"name" : "Send best streamer", "state" : "false"}],
}
         

function init(app_name) {
    var mydata;
    for (let i = 0; i != services.length; i++) {
        if (services[i] === app_name) {
            mydata = tab[services[i]];
        }
    }

    document.getElementById('button1').innerHTML = mydata[0]["name"];
    var goto_button1 = "window.location.href='/Page?" + (mydata[0]["name"]).split(" ").join("_") + "'";
    var goto_button2 = "window.location.href='/Page?" + (mydata[1]["name"]).split(" ").join("_") + "'";

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