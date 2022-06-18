// Handle keyboard navigation and press enter on brand card
let cards = document.getElementsByClassName("card-body");

for (let i = 0, length = cards.length; i < length; i++) {
    cards[i].addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
            let brandId = $(event.target).data("id");
            window.location.href = `/brand/${brandId}`;
        }
    })
}
