/**
 * Event listener for save button
 */
$(() => {
    $("#save-button").on('click', (event => {
        let brandId = $(event.target).data("id"); // get the brandId
        let isSaved = $("#save-button").hasClass("saved"); // check if brand is already saved
        if (!isSaved) {
            $.get(`/api/brand/${brandId}/save`, (results = {}) => { // make AJAX request with the brand ID to save
                if (results.data && results.data.success) {
                    $("#save-button span").text("Unsave");
                    $("#save-button").addClass("saved");

                    //Show success feedback
                    $("#detail-page .success-icon").removeClass("d-none");
                    $("#detail-page .success-unsave-message").addClass("d-none");
                    $("#detail-page .success-save-message").removeClass("d-none");
                    //show the saved icon
                    $("#saved-icon-wrapper").removeClass('d-none');
                } else {
                    alert(`Please log in to save brand.`);
                }
            });
        } else {
            $.get(`/api/brand/${brandId}/remove`, () => { // make AJAX request with the brand ID to save
                $("#save-button span").text("Save");
                $("#save-button").removeClass("saved");

                //Show success feedback
                $("#detail-page .success-icon").removeClass("d-none");
                $("#detail-page .success-save-message").addClass("d-none");
                $("#detail-page .success-unsave-message").removeClass("d-none");
                //hide the saved icon
                $("#saved-icon-wrapper").addClass('d-none');
            });
        }
    }));
});

/**
 * Read more read less
 * https://www.freakyjolly.com/custom-jquery-function-read-more-and-read-less/
 */
function addReadMore() {
    //This limit you can set after how much characters you want to show Read More.
    let limit = 250;
    // Text to show when text is collapsed
    let readMoreTxt = " ... Read more";
    // Text to show when text is expanded
    let readLessTxt = " Read less";


    //Traverse all selectors with this class and manipulate HTML part to show Read More
    $(".addReadMore").each(function() {
        if ($(this).find(".firstSec").length)
            return;

        let brandDescription = $(this).text();
        if (brandDescription.length > limit) {
            let firstSet = brandDescription.substring(0, limit);
            let hiddenString = brandDescription.substring(limit, brandDescription.length);
            let stringEnd = firstSet + "<span class='hidden-part'>" + hiddenString + "</span><span class='readMore' title='Click to show more'>" + readMoreTxt + "</span><span class='readLess' title='Click to show less'>" + readLessTxt + "</span>";
            $(this).html(stringEnd);
        }

    });

    //Read More and Read Less click event binding
    $(document).on("click", ".readMore,.readLess", function() {
        $(this).closest(".addReadMore").toggleClass("showlesscontent showmorecontent");
    });
}

$(() => {
    //Calling function after loading page
    addReadMore();
});
