// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
//
// const button = document.querySelector('button[data-start]');
// button.setAttribute('disabled', 'disabled');
// button.addEventListener('click', onStart);
//
// const refs = {
//   daysRef: document.querySelector('span[data-days]'),
//   hourRef: document.querySelector('span[data-hours]'),
//   minsRef: document.querySelector('span[data-minutes]'),
//   secsRef: document.querySelector('span[data-seconds]'),
// }
//
// let intervalTime = null;
//
// const t = flatpickr(document.querySelector('#datetime-picker'), {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     if (new Date() > selectedDates[0]) {
//       return alert("Please choose a date in the future");
//     } else {
//       button.removeAttribute('disabled');
//     }
//
//     // button.removeAttribute('disabled');
//     //
//     // intervalTime = setInterval(() => {
//     //   const deltaTime = selectedDates[0] - new Date();
//     //   if (deltaTime <= 0) {
//     //     stop();
//     //     return;
//     //   }
//     //   updateClock(deltaTime);
//     // }, 1000)
//   },
// });
//
// function onStart() {
//   // button.removeAttribute('disabled');
//
//   intervalTime = setInterval(() => {
//     const deltaTime = t.selectedDates[0] - t.defaultDate;
//     if (deltaTime <= 0) {
//       stop();
//       return;
//     }
//     updateClock(deltaTime);
//   }, 1000)
// }
//
// function updateClock(deltaTime) {
//   const days = pad(Math.floor(deltaTime / (1000 * 60 * 60 * 24)));
//   const hours = pad(Math.floor((deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
//   const mins = pad(Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60)));
//   const secs = pad(Math.floor((deltaTime % (1000 * 60)) / 1000));
//
//   refs.daysRef.textContent = days;
//   refs.hourRef.textContent = hours;
//   refs.minsRef.textContent = mins;
//   refs.secsRef.textContent = secs;
// }
//
// function pad(value) {
//   return String(value).padStart(2, '0');
// }
//
// function stop() {
//   clearInterval(intervalTime);
// }


// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const inputDate = document.querySelector('#datetime-picker');
const submitDate = document.querySelector('[data-start]');
let userDate = null;
let timerSetter = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] >= new Date()) {
      submitDate.removeAttribute('disabled');
    } else {
      submitDate.setAttribute('disabled', 'disabled');
      window.alert("Please choose a date in the future");
    }
    userDate = selectedDates[0];
  },
};

function logDate() {
  const timeToWait = userDate - new Date();
  const timerTime = convertMs(timeToWait);
  console.log(convertMs(timeToWait));
  return timerTime;
}

function setTimer() {
  const { days, hours, minutes, seconds } = logDate();
  document.querySelector('[data-days]').textContent = days.toString().padStart(2, '0');
  document.querySelector('[data-hours]').textContent = hours.toString().padStart(2, '0');
  document.querySelector('[data-minutes]').textContent = minutes.toString().padStart(2, '0');
  document.querySelector('[data-seconds]').textContent = seconds.toString().padStart(2, '0');
}

function submitDateClick() {
  timerSetter = setInterval(() => {
    const diff = userDate - new Date();
    if (diff <= 0) {
    clearInterval(timerSetter);
    return;
  }
  setTimer(diff);
  }, 1000);
}

submitDate.addEventListener('click', submitDateClick);

const fp = flatpickr(inputDate, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
