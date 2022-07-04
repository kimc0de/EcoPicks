const limit = 15;

$(() => {
    $(window).on('load', () => {
        if (window.location.pathname.includes('/category/')) {
            let brandsList = $('#brandsByCategory .card-wrapper');
            let loadMoreBtn = $('#brandsByCategory .load-more');
            // Show the first results
            brandsList.slice(0, limit).show();

            if(brandsList.length >= limit) {
                loadMoreBtn.show();
            }

            loadMoreBtn.on('click keydown', () => {
                let hiddenBrands = $('#brandsByCategory .card-wrapper:hidden');

                hiddenBrands.slice(0, limit).show();

                let remainBrands = $('#brandsByCategory .card-wrapper:hidden');

                if(remainBrands.length === 0) {
                    loadMoreBtn.fadeOut();
                }
            })
        }
    })
})

$(() => {
    $(window).on('load', () => {
        if (window.location.pathname.includes('/search')) {
            let brandsList = $('#search-results .card-wrapper');

            let loadMoreBtn = $('#search-results .load-more');
            // Show the first results
            brandsList.slice(0, limit).show();

            if(brandsList.length >= limit) {
                loadMoreBtn.show();
            }

            loadMoreBtn.on('click', () => {
                let hiddenBrands = $('#search-results .card-wrapper:hidden');

                hiddenBrands.slice(0, limit).show();

                let remainBrands = $('#search-results .card-wrapper:hidden');

                if(remainBrands.length === 0) {
                    loadMoreBtn.fadeOut();
                }
            })
        }
    })
})
