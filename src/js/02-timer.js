'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

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
      Notiflix.Notify.warning("Please choose a date in the future");
    }
    userDate = selectedDates[0];
  },
};
flatpickr(inputDate, options);
submitDate.addEventListener('click', submitDateClick);

function submitDateClick() {
  timerSetter = setInterval(() => {
    const diff = userDate - new Date();
    // console.log(diff);
    if (diff <= 0) {
      clearInterval(timerSetter);
      return;
    }
    setTimer(diff);
  }, 1000);
}

function logDate() {
  const timeToWait = userDate - new Date();
  // console.log(timeToWait);
  const timerTime = convertMs(timeToWait);
  // console.log(timerTime);
  return timerTime;
}

function setTimer() {
  const { days, hours, minutes, seconds } = logDate();
  // const { days, hours, minutes, seconds } = convertMs(userDate - new Date());
  document.querySelector('[data-days]').textContent = days.toString().padStart(2, '0');
  document.querySelector('[data-hours]').textContent = hours.toString().padStart(2, '0');
  document.querySelector('[data-minutes]').textContent = minutes.toString().padStart(2, '0');
  document.querySelector('[data-seconds]').textContent = seconds.toString().padStart(2, '0');
}

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

// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// import Notiflix from 'notiflix';
//
// const input = document.querySelector('#datetime-picker');
// const startTimerBtn = document.querySelector('button[data-start]');
// const daysSpan = document.querySelector('span[data-days]');
// const hoursSpan = document.querySelector('span[data-hours]');
// const minutesSpan = document.querySelector('span[data-minutes]');
// const secondsSpan = document.querySelector('span[data-seconds]');
//
// startTimerBtn.disabled = true;
// let timerId = null;
// let userDate = null;
//
// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     if (selectedDates[0] < options.defaultDate) {
//       Notiflix.Notify.failure('Please choose a date in the future');
//     } else {
//       startTimerBtn.disabled = false;
//     }
//     userDate = selectedDates[0];
//   },
// };
//
// flatpickr(input, options);
//
// // !_______________TIMER__________________
//
// startTimerBtn.addEventListener('click', startTimer);
//
// function startTimer() {
//   timerId = setInterval(() => {
//     const dif = userDate - new Date();
//     if (dif <= 0) {
//       clearInterval(timerId);
//       return;
//     }
//     setTimeSpan();
//   }, 1000);
// }
//
// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;
//
//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);
//
//   return { days, hours, minutes, seconds };
// }
//
// function pad(value) {
//   return String(value).padStart(2, '0');
// }
//
// function setTimeSpan() {
//   const { days, hours, minutes, seconds } = convertMs(userDate - new Date());
//   daysSpan.textContent = pad(days);
//   hoursSpan.textContent = pad(hours);
//   minutesSpan.textContent = pad(minutes);
//   secondsSpan.textContent = pad(seconds);
// }

