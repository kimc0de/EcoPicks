// Close menu toggler mobile
const closeButton = document.getElementById("close-menu");
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
