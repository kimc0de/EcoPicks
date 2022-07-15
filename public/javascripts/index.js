/**
 * Scroll to top button
 */
$(function(){
    let backToTopBtn = $("#back-to-top");

    // Show and hide the button depending on how much user scrolls
    $(window).scroll(function() {
        if ($(window).scrollTop() > 1000 || $(window).scrollTop() > 1000) {
            backToTopBtn.removeClass('d-none');
            backToTopBtn.addClass('d-block');
        } else {
            backToTopBtn.removeClass('d-block');
            backToTopBtn.addClass('d-none');
        }
    });
    // When the user clicks on the button, scroll to the top of the document, focus on skip-link
    backToTopBtn.on('click',() => {
        $('#skip-link').focus();
        $(window).scrollTop(0);
    });
});


