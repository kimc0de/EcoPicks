// Close flash message
const flashMessage = document.getElementById("flash-message");

flashMessage.addEventListener('closed.bs.alert', function () {
    //Move focus to the most appropriate element, so it doesn't get lost/reset to the start of the page
    document.getElementById('main').focus();
})

// Auto-dismiss after 5s
setTimeout(() =>{
    flashMessage.remove();
}, 5000);
