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
                } else {
                    alert(`Please log in to save brand.`);
                }
            });
        } else {
            $.get(`/api/brand/${brandId}/remove`, (results = {}) => { // make AJAX request with the brand ID to save
                $("#save-button span").text("Save");
                $("#save-button").removeClass("saved");

                //Show success feedback
                $("#detail-page .success-icon").removeClass("d-none");
                $("#detail-page .success-save-message").addClass("d-none");
                $("#detail-page .success-unsave-message").removeClass("d-none");
            });
        }
    }));
});
