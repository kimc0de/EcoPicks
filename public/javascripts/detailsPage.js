/**
 * Event listener for save button
 */

$("#save-button").click((event => {
    let brandId = $(event.target).data("id"); // get the brandId

    $.get(`/api/brand/${brandId}/save`, (results = {}) =>{ // make AJAX request with the brand ID to save

        if(results.data && results.data.success) {
            $("#save-button span").text("Saved");
            $("#save-button").addClass("saved");
        } else {
            alert(`Please log in to continue.`);
        }
    });
}));
