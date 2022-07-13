/**
 * Close button for menu navigation on mobile
 */
const closeMenuButton = $('#close-menu');
const navbarContent = $('#navbarContent');
const navbarToggler = $('#menu-button');

closeMenuButton.on('click', () => {
    if(!navbarToggler.hasClass('collapsed')){
        navbarToggler.addClass('collapsed');
    }

    if(navbarContent.hasClass('show')) {
        navbarContent.addClass('show');
    }
})

/**
 * Close button for search bar on mobile
 */
const closeSearchButton = $('#close-search');
const searchBar = $('#searchBar');
const searchToggler = $('.search-button')

closeSearchButton.on('click', function () {
    if(!searchToggler.hasClass('collapsed')){
        searchToggler.addClass('collapsed');
    }

    if(searchBar.hasClass('show')) {
        searchBar.removeClass('show');
    }
})

/**
 * Prevent empty search submit
 */
const searchForm = $('#search-form-lg');
const searchInput = $('#search-input-lg');

$(() => {
    searchForm.on('submit', (e) => {
        console.log(searchInput.val());
        if($.trim(searchInput.val()).length === 0) {
            console.log('empty');
            e.preventDefault();
        }
    })
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
