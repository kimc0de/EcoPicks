/**
 * Close button for menu navigation on mobile
 */
const closeMenuButton = document.getElementById('close-menu');
const navbarContent = document.getElementById('navbarContent');
const navbarToggler = document.getElementById('menu-button');

closeMenuButton.addEventListener('click', function () {
    if(!navbarToggler.classList.contains('collapsed')){
        navbarToggler.classList.add('collapsed');
    }

    if(navbarContent.classList.contains('show')) {
        navbarContent.classList.remove('show');
    }
})

/**
 * Close button for search bar on mobile
 */
const closeSearchButton = $('#close-search');
const searchBar = $('#searchBar');
const searchToggler = $('#search-button')

closeSearchButton.on('click', function () {
    if(!searchToggler.hasClass('collapsed')){
        searchToggler.addClass('collapsed');
    }

    if(searchBar.hasClass('show')) {
        searchBar.removeClass('show');
    }
})

/**
 * Active style for category navigation
 */
// Desktop
const header = document.getElementById("header");
const categoryNav = header.getElementsByClassName("category-nav-link");

function applyActiveStyle () {
    let current = location.pathname.split("/")[2];
    if (current === "") return;

    if(categoryNav) {
        for (let i = 0, length = categoryNav.length; i < length; i++) {
            if (categoryNav[i].getAttribute("href").split("/")[2] === current) {
                categoryNav[i].className += " active";
                categoryNav[i].setAttribute("aria-current", "page");
            } else {
                categoryNav[i].removeAttribute("aria-current");
            }
        }
    }
}

document.body.onload = applyActiveStyle;
window.onresize = applyActiveStyle;
