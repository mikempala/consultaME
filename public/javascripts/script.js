document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);



$(function() {
    console.log('entro al js principal');

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

    if (page=='perfil'){
        console.log('esta en la pagina perfil');
        $("#logout").removeClass('hide');
    }
});