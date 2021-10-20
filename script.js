const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set date input min with today's date (GMT-0400 (Eastern Daylight Time))
const tzOffset = (new Date().getTimezoneOffset() * 60000);
const today = new Date(Date.now() - tzOffset).toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// Populate countdown and complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - (now - tzOffset);
        console.log(distance);    

        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        console.log(days, hours, minutes, seconds);

        // Populate countdown
        countdownElTitle.textContent = `${countdownTitle}`;
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;

        // Hide input
        inputContainer.hidden = true;
        // Show countdown
        countdownEl.hidden = false;
    }, second);
}

// Take values from form input
function updateCountdown(event) {
    event.preventDefault();
    countdownTitle = event.srcElement[0].value;
    countdownDate = event.srcElement[1].value;
    console.log(countdownTitle, countdownDate);
    // Check for valid date
    if (countdownDate === "") {
        alert("Please select a day for the countdown.");
    } else {
        // Get number version of current Date, updateDOM
        countdownValue = new Date(countdownDate).getTime();
        console.log(countdownValue);
        updateDOM();
    }
}

// Reset all values
function reset() {
    // Hide countdowns, show input
    countdownEl.hidden = true;
    inputContainer.hidden = false;
    // Stop the countdown
    clearInterval(countdownActive);
    // Reset values
    countdownTitle = "";
    countdownDate = "";
}

// Event listeners
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);