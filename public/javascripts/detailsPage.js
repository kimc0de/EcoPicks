/**
 * Event listener for save button
 */
$(() => {
    $("#save-button").click((event => {
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
 * https://stackoverflow.com/a/62248082
 */
$(() => {
    const readMore = () => {
        let limit = 200;
        $(".description-text").each(function() {
            let description = $(this).text();
            if ($.trim(description).length > limit) {
                let visibleString = description.substring(0, limit);
                let hiddenString = description.substring(limit, $.trim(description).length);
                $(this).empty().html(visibleString);
                $(this).append('...  <a href="javascript:void(0);" class="fw-bold read-more">read more</a>');
                $(this).append('<span class="more-text">' + hiddenString + ' <a href="javascript:void(0);" class="fw-bold read-less">read less</a>' + '</span>');
            }
        });

    }
    readMore();
    $(document).on("click", ".read-more", function() {
        $(this).siblings(".more-text").contents().unwrap();
        $(this).remove();
    });

    $(document).on("click", ".read-less", function() {
        $(this).remove();
        readMore();
    });
});
