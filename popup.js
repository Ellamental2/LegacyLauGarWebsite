

let popup = null;

$(document).ready(function() {
    popup = document.getElementById('popup');
    openPopup();
});

function openPopup() {
    popup.classList.add('popup__open');
}
function closePopup() {
    popup.classList.remove('popup__open');
}
