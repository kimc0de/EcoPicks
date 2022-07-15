
// When the user scrolls down 20px from the top of the document, show the button
$(function(){
    //Get the button
    let mybutton = $("#back-to-top");

    $(window).scroll(function() {
        if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
            mybutton.removeClass('d-none');
            mybutton.addClass('d-block');
        } else {
            mybutton.removeClass('d-block');
            mybutton.addClass('d-none');
        }
    });
    // When the user clicks on the button, scroll to the top of the document
    mybutton.on('click',() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
});


