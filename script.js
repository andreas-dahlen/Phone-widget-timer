let totalSeconds = 180; // 3 minutes
let remaining = totalSeconds;
let running = false;
let timer;

const timerDisplay = document.getElementById("timer");

function updateDisplay() {
  let mins = String(Math.floor(remaining / 60)).padStart(2, "0");
  let secs = String(remaining % 60).padStart(2, "0");
  timerDisplay.textContent = `${mins}:${secs}`;
}

function startTimer() {
  running = true;
  timer = setInterval(() => {
    if (remaining > 0) {
      remaining--;
      updateDisplay();
    } else {
      clearInterval(timer);
      running = false;
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  running = false;
  remaining = totalSeconds;
  updateDisplay();
}

timerDisplay.addEventListener("click", () => {
  if (!running) {
    resetTimer();  // always reset to 3:00 before starting
    startTimer();
  } else {
    resetTimer();  // click during running = reset back to 3:00
  }
});

updateDisplay();