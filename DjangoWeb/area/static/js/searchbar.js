function searchFunction(searchByClick) {
  div = document.getElementsByClassName('cards')
  input = document.getElementById('myInput');
  filter = input.value.toLowerCase();
  for (i = 0; i < div.length; i++) {
    if (!searchByClick) {
      if (div[i].id.search(filter) == -1) {
        // div[i].style.display = "none"
        $('#' + div[i].id).fadeOut(1000);
      }
      else {
        $('#' + div[i].id).fadeIn();
      }
    }
    else {
      dict = {
        'cloud': ['dropbox', 'google-drive'],
        'mail': ['google-gmail', 'microsoft-outlook'],
        'message': ['messenger', 'whatsapp'],
        'socialNetwork': ['instagram', 'twitter', 'facebook'],
        'streaming': ['youtube', 'twitch', 'spotify', 'soundcloud', 'netflix', 'deezer'],
      }
      console.log(searchByClick)
      console.log(dict[searchByClick])
      if (!dict[searchByClick].includes(div[i].id))
        $('#' + div[i].id).fadeOut(1000);
      else
        $('#' + div[i].id).fadeIn();
    }
  }
}


div = document.getElementsByClassName('cards')
links = $('.link_image')
for (var i = 0; i < div.length; i++) {
  service = div[i].id.split('/')
  service = service[service.length - 1].replace('-icon.png', '')
  div[i].id = service
  $(links[i]).attr("href", ($(links[i]).attr("href") + "?service=" + service))
}

var el = document.getElementById("disconnect");
el.addEventListener("click", deleteCookie, false);

  // console.log($(this))
  // $(this).attr("href", $(this).attr("href") + $(this).attr('id'))
// });