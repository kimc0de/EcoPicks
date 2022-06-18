/**
 * Close flash message
 */
const flashMessage = document.getElementById("flash-message");
const errorFlashMessage = document.getElementById("flash-error");
const successFlashMessage = document.getElementById("flash-success");

//Move focus to the most appropriate element, so it doesn't get lost/reset to the start of the page
//https://getbootstrap.com/docs/5.0/components/alerts/
flashMessage.addEventListener('closed.bs.alert', function () {

    document.getElementById('main').focus();
})

window.addEventListener('load', () => {
    // Remove parent from dom if there's no flash message
    if(!successFlashMessage && !errorFlashMessage) {
        flashMessage.remove();
    }

    // Auto-dismiss after 5s for success flash message
    if (successFlashMessage) {
        setTimeout(() =>{
            successFlashMessage.parentElement.remove();
        }, 4000);
    }
})
