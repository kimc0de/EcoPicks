$(() => {
    $(window).on('load', () => {
        if (window.location.pathname.includes('/category/')) {
            let brandsList = $('#brandsByCategory .card-wrapper');
            let loadMoreBtn = $('#load-more');
            // Show the first results
            brandsList.slice(0,9).show();

            loadMoreBtn.on('click', () => {
                $('#brandsByCategory .card-wrapper:hidden').slice(0,15).show();

                if($('#brandsByCategory .card-wrapper:hidden').length === 0) {
                    loadMoreBtn.fadeOut();
                }
            })
        }
    })
})
