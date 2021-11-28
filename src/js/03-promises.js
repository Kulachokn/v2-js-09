'use strict'
import {Notify} from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('.delay'),
  step: document.querySelector('.step'),
  amount: document.querySelector('.amount')
}

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  let paramDelay = Number(refs.delay.value);
  let paramStep = Number(refs.step.value);

  for (let i = 1; i <= +refs.amount.value; i += 1) {
    createPromise(i, paramDelay)
      .then(onSuccess)
      .catch(onError);

    paramDelay += paramStep;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay)
  })
}

function onSuccess({position, delay}) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {clickToClose: true});
}

function onError({position, delay}) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, { clickToClose: true });
}

// import { Notify } from 'notiflix';
//
// const promiseOn = {
//   form: document.querySelector('.form'),
//   btn: document.querySelector('.js-btn'),
// };
//
// promiseOn.btn.addEventListener('click', onBtnClick);
//
// function onBtnClick(e) {
//   e.preventDefault();
//
//   const { delay, step, amount } = Object.fromEntries(new FormData(promiseOn.form));
//
//   for (let i = 0; i < amount; i += 1) {
//     createPromise(i, Number(delay) + Number(step) * i)
//       .then(onSuccess)
//       .catch(onError);
//   }
// }
//
// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }
//
// function onSuccess({ position, delay }) {
//   Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, { clickToClose: true });
// }
//
// function onError({ position, delay }) {
//   Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, { clickToClose: true });
// }