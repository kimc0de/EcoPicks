const clear_button = document.getElementById("clear_button");
const search_field = document.getElementById("search_field");
const search_form = document.getElementById("search");

clear_button.addEventListener("click", function(event) {
    if (search_field.value !== '') {
        search_field.value = '';
        event.preventDefault();
    }
})

search_form.addEventListener('submit', function(event) {
    if (search_field.value === '') {
        event.preventDefault();
    }
})
