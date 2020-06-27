$(document).ready(function () {

    $('.icon-menu-open').click(function () {
        $(".header__menu").addClass("active");
        $("body").addClass("lock");
    })

    $('.icon-menu-close').click(function () {
        $(".header__menu").removeClass("active");
        $("body").removeClass("lock");
    })
})