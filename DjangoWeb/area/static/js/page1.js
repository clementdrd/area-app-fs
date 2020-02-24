function Dynamic_Text() {


    var href = window.location.href;
    var toto = href.split('?')
    var tata = toto[1].split('_').join(' ')
    console.log(tata);
    document.getElementById('main_text').value = tata;

    return false;
}

function set_connected() {
    var mydata = JSON.parse(youtube);
    //console.log(mydata[0].state);
    var href = window.location.href;
    var splited = href.split('?')
    var service_name = splited[1].split("_").join(" ");
    console.log("recup service name" + service_name);
    console.log("mydata[0].name" + mydata[0].name);
    console.log("mydata[1].name" + mydata[1].name);

    // A FAIRE : UPDATE LE STATE DANS LE FICHIER DATA.JSON EN TRUE QUAND ON APPUIE SUR LE BOUTON 

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