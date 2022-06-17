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
const header = document.getElementById('header');
const categoryNav = header.getElementsByClassName('category-nav-link');

function applyActiveStyle () {
    let current = location.pathname.split('/')[2];
    if (current === "") return;

    if(categoryNav) {
        for (let i = 0, length = categoryNav.length; i < length; i++) {
            if (categoryNav[i].getAttribute("href").split('/')[2] === current) {
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
