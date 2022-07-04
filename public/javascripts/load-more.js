$(() => {
    $(window).on('load', () => {
        if (window.location.pathname.includes('/category/')) {
            let brandsList = $('#brandsByCategory .card-wrapper');
            let loadMoreBtn = $('#brandsByCategory .load-more');
            // Show the first results
            brandsList.slice(0,9).show();

            loadMoreBtn.on('click', () => {
                let hiddenBrands = $('#brandsByCategory .card-wrapper:hidden');
                hiddenBrands.slice(0,15).show();

                if(hiddenBrands.length === 0) {
                    loadMoreBtn.fadeOut();
                }
            })
        }
    })
})

