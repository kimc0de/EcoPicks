// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_scroll_to_top
/**
 * Scroll to top button
 */
$(function(){
    //Get the button
    let backToTopBtn = $("#back-to-top");

    $(window).scroll(function() {
        if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
            backToTopBtn.removeClass('d-none');
            backToTopBtn.addClass('d-block');
        } else {
            backToTopBtn.removeClass('d-block');
            backToTopBtn.addClass('d-none');
        }
    });
    // When the user clicks on the button, scroll to the top of the document
    backToTopBtn.on('click',() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
});


