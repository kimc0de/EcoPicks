// Close menu toggler mobile
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

// Categories navigation - set active style for active link
const headerBottom = document.getElementById('header-bottom');
const categoryNav = headerBottom.getElementsByClassName('bottom-nav-link');

for (let i = 0; i < categoryNav.length; i++) {
    categoryNav[i].addEventListener("click", function(e) {
        for (let j = 0; j < categoryNav.length; j++) {
            if(categoryNav[j].classList.contains("active")){
                categoryNav[j].className = categoryNav[j].className.replace(" active", "");
            }
        }
        this.className += " active";
    });
}
