/**
 * Prevent empty search submit (No search results page)
 */
const searchForm = $('#search-form');
const searchInputLgBody = $('#search-input-lg-body');

$(() => {
  searchForm.on('submit', (e) => {
    if($.trim(searchInputLgBody.val()).length === 0) {
      e.preventDefault();
    }
  });
});
