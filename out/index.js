var menu = document.getElementById("menu");
function setActiveIndex(index) {
    if (menu != null) {
        menu.dataset.activeIndex = index.toString();
        console.log("Active index: " + index.toString());
    }
}
var menuItems = document.getElementsByClassName("card-wrapper");
for (var i = 0; i < menuItems.length; i++) {
    (function (index) {
        menuItems[index].addEventListener("mouseover", function () { setActiveIndex(index); });
    })(i);
}
