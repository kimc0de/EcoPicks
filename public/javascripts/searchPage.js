const search_field = document.getElementById("search_field");
const search_form = document.getElementById("search");

search_form.addEventListener('submit', function(event) {
    if (search_field.value === '') {
        event.preventDefault();
    }
})
