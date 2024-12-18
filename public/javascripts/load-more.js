/**
 * Load more button for brands by categories page and search results page
 * https://www.youtube.com/watch?v=4UZdSp9PMI4
 */
document.addEventListener("DOMContentLoaded", function() {
    let limit = 24;
    if (window.location.pathname.includes('/category/') ||
        window.location.pathname.includes('/search')
    ) {
        let brandsList = document.querySelectorAll('.card-wrapper');
        let loadMoreBtn = document.querySelector('.load-more');

        if (brandsList.length < limit) {  //show all if list is less than 12 items
            for (let i = 0; i < brandsList.length; i ++) {
                brandsList[i].style.display = 'list-item';
            }
        } else { // otherwise, show load more button & load the first 12 items
            for (let i = 0; i < limit; i ++) {
                brandsList[i].style.display = 'list-item';
            }
            loadMoreBtn.style.display = 'block';
            // each time button is clicked, show the next 12 items
            loadMoreBtn.addEventListener('click', () => {
                if ((limit * 2) <= brandsList.length) {
                    for (let i = limit; i < limit * 2; i ++) {
                        brandsList[i].style.display = 'list-item';
                    }
                    loadMoreBtn.blur();
                    brandsList[limit].querySelector('.brand-name').focus();
                    limit += limit;
                } else {
                    for (let i = limit; i < brandsList.length; i ++) {
                        brandsList[i].style.display = 'list-item';
                    }
                    loadMoreBtn.blur();
                    brandsList[limit].querySelector('.brand-name').focus();
                    // no items left, hide load more button
                    loadMoreBtn.style.display = 'none';
                }
            })
        }
    }
});
