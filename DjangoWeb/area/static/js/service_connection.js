function init(app_name) {
    console.log(app_name)

    if (app_name == "youtube")
        var mydata = JSON.parse(youtube);
    else if (app_name == "facebook")
        var mydata = JSON.parse(facebook);
    else if (app_name == "twitter")
        var mydata = JSON.parse(twitter);
    else if (app_name == "whatsapp")
        var mydata = JSON.parse(whatsapp);
    else if (app_name == "amazon")
        var mydata = JSON.parse(amazon);
    else if (app_name == "netflix")
        var mydata = JSON.parse(netflix);
    else if (app_name == "deezer")
        var mydata = JSON.parse(deezer);
    else if (app_name == "gmail")
        var mydata = JSON.parse(gmail);
    else if (app_name == "dropbox")
        var mydata = JSON.parse(dropbox);

    console.log(mydata[0].name);
    document.getElementById('button1').innerHTML = mydata[0].name;
    var goto_button1 = "window.location.href='/Page?" + (mydata[0].name).split(" ").join("_") + "'";
    var goto_button2 = "window.location.href='/Page?" + (mydata[1].name).split(" ").join("_") + "'";

    var foo = document.getElementById("button1");
    foo.setAttribute("onclick", goto_button1);

    var foo = document.getElementById("button2");
    foo.setAttribute("onclick", goto_button2);

    console.log(mydata[0].state);
    console.log(mydata[1].name);
    document.getElementById('button2').innerHTML = mydata[1].name;
    console.log(mydata[1].state);
}

function change_logo() {
    var href = window.location.href;
    var app_name = href.split('=');
    console.log(app_name[1]);

    var x = document.getElementsByTagName("img").item(0);
    var v = "";

    switch (app_name[1]) {

        case "amazon":
            v = "/static/images/icon/amazon-icon.png";
            break;
        case "facebook":
            v = "/static/images/icon/facebook-icon.png";
            break;
        case "twitter":
            v = "/static/images/icon/twitter-icon.png";
            break;
        case "whatsapp":
            v = "/static/images/icon/whatsapp-icon.png";
            break;
        case "youtube":
            v = "/static/images/icon/youtube-icon.png";
            break;
        case "deezer":
            v = "/static/images/icon/deezer-icon.png";
            break;
        case "dropbox":
            v = "/static/images/icon/dropbox-icon.png";
            break;
        case "gmail":
            v = "/static/images/icon/google-gmail-icon.png";
            break;
        case "netflix":
            v = "/static/images/icon/netflix2-icon.png";
            break;
        case "weather":
            v = "/static/images/icon/weather-icon.png";
            break;

        default:

    }

    x.setAttribute("src", v);
    x.style.width = '18%';
    x.style.left = '0';

    init(app_name[1]);

}