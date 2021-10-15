const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

let countdownTitle = "";
let countdownDate = "";

// Set date input min with today's date (GMT-0400 (Eastern Daylight Time))
const tzOffset = (new Date().getTimezoneOffset() * 60000);
const today = new Date(Date.now() - tzOffset).toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// Take values from form input
function updateCountdown(event) {
    event.preventDefault();
    countdownTitle = event.srcElement[0].value;
    countdownDate = event.srcElement[1].value;
    console.log(countdownTitle, countdownDate);
}

// Event listeners
countdownForm.addEventListener("submit", updateCountdown);