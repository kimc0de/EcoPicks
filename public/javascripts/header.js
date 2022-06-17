/**
 * Close button for menu navigation on mobile
 */
const closeButton = document.getElementById('close-menu');
const navbarContent = document.getElementById('navbarContent');
const navbarToggler = document.getElementById('menu-button');

closeButton.addEventListener('click', function () {
    if(!navbarToggler.classList.contains('collapsed')){
        navbarToggler.classList.add('collapsed');
    }

    if(navbarContent.classList.contains('show')) {
        navbarContent.classList.remove('show');
    }
})

/**
 * Active style for category navigation
 */
// Desktop
const headerBottom = document.getElementById('header-bottom');
const categoryNav = headerBottom.getElementsByClassName('bottom-nav-link');
// Mobile
const headerMobile = document.getElementById("header-mobile");
const categoryNavMobile = headerMobile.getElementsByClassName('bottom-nav-link');

function applyActiveStyle () {
    let current = location.pathname.split('/')[2];
    if (current === "") return;

    if(categoryNav) {
        for (let i = 0, length = categoryNav.length; i < length; i++) {
            if (categoryNav[i].getAttribute("href").split('/')[2] === current) {
                categoryNav[i].className += " active";
            }
        }
    }

    if(categoryNavMobile) {
        for (let i = 0, length = categoryNavMobile.length; i < length; i++) {
            if (categoryNavMobile[i].getAttribute("href").split('/')[2] === current) {
                categoryNavMobile[i].className += " active";
            }
        }
    }
}

document.body.onload = applyActiveStyle;
window.onresize = applyActiveStyle;
