const timerDisplay = document.getElementById("timer");

if (!timerDisplay) {
  console.error("Timer element not found! Check your HTML.");
} else {

  let totalSeconds = 180; // normal 3 minutes
  const TEST_MODE = true;
  if (TEST_MODE) totalSeconds = 5; // preview mode

  let remaining = totalSeconds;
  let timer = null;

  function updateDisplay() {
    let mins = String(Math.floor(remaining / 60)).padStart(2, "0");
    let secs = String(remaining % 60).padStart(2, "0");
    timerDisplay.textContent = `${mins}:${secs}`;

    if (remaining > 60) {
      timerDisplay.style.color = "lime";
    } else if (remaining > 20) {
      timerDisplay.style.color = "orange";
    } else if (remaining > 0) {
      timerDisplay.style.color = "red";
    }
  }

  function tick() {
    if (remaining > 0) {
      remaining--;
      updateDisplay();
      timer = setTimeout(tick, 1000);
    } else {
      finishTimer();
    }
  }

  function startTimer() {
    if (timer) return; // already running
    if (remaining <= 0) remaining = totalSeconds;

    timerDisplay.classList.remove("flash", "fade");
    updateDisplay();
    timer = setTimeout(tick, 1000); // first tick after 1s
  }

  function resetTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    remaining = totalSeconds;
    updateDisplay();

    timerDisplay.classList.remove("flash");
    timerDisplay.classList.add("fade");
    setTimeout(() => {
      timerDisplay.classList.remove("fade");
    }, 300);
  }

  function finishTimer() {
    timer = null;
    remaining = 0;
    updateDisplay();
    timerDisplay.classList.add("flash");
  }

  // Start automatically
  startTimer();

  // Click to reset/start
  timerDisplay.addEventListener("click", () => {
    if (timer) {
      resetTimer();
    } else {
      startTimer();
    }
  });

  // Initial display
  updateDisplay();
}