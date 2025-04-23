// script.js

let countdownTimer = 60;
let pollResults = {};
let voted = false;

// Poll option clicks
const pollOptions = document.querySelectorAll('.poll-option');
const voteButton = document.getElementById('vote-button');
const resultsDiv = document.getElementById('results');
const countdownDisplay = document.getElementById('countdown');
const resultContent = document.getElementById('result-content');

// Start countdown
let timer = setInterval(function () {
    if (countdownTimer <= 0) {
        clearInterval(timer);
        displayResults();
    } else {
        countdownTimer--;
        countdownDisplay.textContent = countdownTimer;
    }
}, 1000);

// Handle poll option selection
pollOptions.forEach((option, index) => {
    option.addEventListener('click', () => {
        if (!voted) {
            voted = true;
            pollResults[index] = (pollResults[index] || 0) + 1;
            voteButton.disabled = false;
        }
    });
});

// Submit vote
voteButton.addEventListener('click', () => {
    displayResults();
});

// Display results only to the owner (this is just simulated here)
function displayResults() {
    let resultHTML = '';
    for (let [option, votes] of Object.entries(pollResults)) {
        resultHTML += `<div>Option ${parseInt(option) + 1}: ${votes} votes</div>`;
    }
    resultContent.innerHTML = resultHTML;
    resultsDiv.style.display = 'block';
    voteButton.disabled = true;
}