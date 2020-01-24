function Dynamic_Text() {


    var href = window.location.href;
    var toto = href.split('?')
    var tata = toto[1].split('_').join(' ')
    console.log(tata);
    document.getElementById('main_text').value = tata;

    return false;
}

var i = 0;

function doOnClick() {

    if (i == 0) {
        document.getElementById('switch_text').value = 'Connected';
        i = i + 1;
    } else {
        document.getElementById('switch_text').value = 'Disconnected';
        i = 0;
    }
    return false;

}