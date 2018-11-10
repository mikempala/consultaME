document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);



$(function() {
    if (session==true){
        console.log('esta en la pagina perfil');
        $("#logout").removeClass('hide');
        $("#login").addClass('hide');
    }



    $(".navbar-nav a").on("click", function () {
        console.log("entro activa");
        $(".navbar-nav").find(".activa").removeClass("activa");
        $(".navbar a").removeClass("activa");
        $(this).addClass("activa");

    });
    $(".navbar a").on("click", function () {
        console.log("entro brand");
        $(".navbar-nav").find(".activa").removeClass("activa");
        $(this).addClass("activa");
    });


});