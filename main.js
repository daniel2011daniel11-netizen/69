function updateNewYearCountdown() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const newYearDate = new Date(currentYear + 1, 0, 1, 0, 0, 0);
  const diffTime = newYearDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  document.querySelector('#ny-counter').textContent = `До Нового года осталось ${diffDays} дней`;
}
updateNewYearCountdown();


let timerInterval = null;
let timerSeconds = 10; 
const timerDisplay = document.querySelector('#timer-display');

function formatTime(sec) {
  const minutes = String(Math.floor(sec / 60)).padStart(2, '0');
  const seconds = String(sec % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

timerDisplay.textContent = formatTime(timerSeconds);

document.querySelector('#timer-start').addEventListener('click', () => {
  if (timerInterval) return; 
  timerInterval = setInterval(() => {
    if (timerSeconds > 0) {
      timerSeconds--;
      timerDisplay.textContent = formatTime(timerSeconds);
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("Время вышло!");
    }
  }, 1000);
});

document.querySelector('#timer-stop').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
});

document.querySelector('#timer-reset').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timerSeconds = 10;
  timerDisplay.textContent = formatTime(timerSeconds);
});


let stopwatchInterval = null;
let stopwatchSeconds = 0;
const stopwatchDisplay = document.querySelector('#stopwatch-display');
const lapsList = document.querySelector('#laps-list');

document.querySelector('#stopwatch-start').addEventListener('click', () => {
  if (stopwatchInterval) return;
  stopwatchInterval = setInterval(() => {
    stopwatchSeconds++;
    stopwatchDisplay.textContent = formatTime(stopwatchSeconds);
  }, 1000);
});

document.querySelector('#stopwatch-stop').addEventListener('click', () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
});

document.querySelector('#stopwatch-reset').addEventListener('click', () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  stopwatchSeconds = 0;
  stopwatchDisplay.textContent = formatTime(stopwatchSeconds);
  lapsList.innerHTML = ''; 
});

document.querySelector('#stopwatch-lap').addEventListener('click', () => {
  if (stopwatchSeconds === 0 && !stopwatchInterval) return;
  const lapItem = document.createElement('li');
  lapItem.textContent = `Круг: ${formatTime(stopwatchSeconds)}`;
  lapsList.append(lapItem);
});


let targetAlarmTime = null;

document.querySelector('#set-alarm').addEventListener('click', () => {
  targetAlarmTime = document.querySelector('#alarm-input').value;
  if (targetAlarmTime) {
    document.querySelector('#alarm-message').textContent = `Будильник установлен на ${targetAlarmTime}`;
  }
});

setInterval(() => {
  if (!targetAlarmTime) return;

  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const currentTimeFormatted = `${hours}:${minutes}`;

  if (currentTimeFormatted === targetAlarmTime) {
    document.querySelector('#alarm-message').textContent = "🔔 Пора! Сработал будильник!";
    targetAlarmTime = null; 
  }
}, 1000);