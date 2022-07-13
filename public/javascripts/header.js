/**
 * Close button for menu navigation on mobile
 */
const closeMenuButton = $('#close-menu');
const navbarContent = $('#navbarContent');
const navbarToggler = $('#menu-button');

closeMenuButton.on('click', () => {
    console.log('click');
    if(!navbarToggler.hasClass('collapsed')){
        navbarToggler.addClass('collapsed');
    }

    if(navbarContent.hasClass('show')) {
        navbarContent.removeClass('show');
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
 * Prevent empty search submit (Desktop)
 */
const searchFormLg = $('#search-form-lg');
const searchInputLg = $('#search-input-lg');

$(() => {
    searchFormLg.on('submit', (e) => {
        if($.trim(searchInputLg.val()).length === 0) {
            e.preventDefault();
        }
    });
});

/**
 * Prevent empty search submit (Mobile)
 */
const searchFormSm = $('#search-form-sm');
const searchInputSm = $('#search-input-sm');

$(() => {
    searchFormSm.on('submit', (e) => {
        if($.trim(searchInputSm.val()).length === 0) {
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
