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
const headerLarge = $('#header-large');
const categoryNav = headerLarge.find('.category-nav-link');
const navbarLinks = navbarContent.find('.nav-item a')

function applyActiveStyle () {
    let current = location.pathname;
    if (current === "") return;

    //desktop header navigation
    if(categoryNav) {
        for (let i = 0, length = categoryNav.length; i < length; i++) {
            if (categoryNav[i].getAttribute("href") === current) {
                categoryNav[i].className += " active";
                categoryNav[i].setAttribute("aria-current", "page");
            } else {
                categoryNav[i].removeAttribute("aria-current");
            }
        }
    }

    //mobile menu navigation
    if (navbarLinks) {
        for (let i = 0, length = navbarLinks.length; i < length; i++) {
            let categoryLink = navbarLinks[i].getAttribute("href");
            let pageNavigationLink = navbarLinks[i].getAttribute("href");
            if (categoryLink !== undefined && categoryLink === current) {
                navbarLinks[i].className += " active";
                navbarLinks[i].setAttribute("aria-current", "page");
            } else if (pageNavigationLink !== undefined && pageNavigationLink === current) {
                navbarLinks[i].className += " active";
                navbarLinks[i].setAttribute("aria-current", "page");
            } else {
                navbarLinks[i].removeAttribute("aria-current");
            }
        }
    }
}

document.body.onload = applyActiveStyle;
window.onresize = applyActiveStyle;
