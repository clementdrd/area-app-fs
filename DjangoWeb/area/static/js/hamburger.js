(function () {
    $("svg").click(function () {
        $("#log-in").css({
      "display": "block" 
    });
        return $("svg").toggleClass("cross");
    });
}).call(this);