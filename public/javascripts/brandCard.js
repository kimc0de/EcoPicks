/**
 * Handle keyboard navigation and press enter on brand card
 */
$(".card-body").keypress((e) => {
    if(e.keyCode ===13) {
        let brandId = $(event.target).data("id");
        window.location.href = `/brand/${brandId}`;
    }
})
