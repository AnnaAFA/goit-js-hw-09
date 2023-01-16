import Notiflix from 'notiflix';
// console.log(Notiflix);

const formRef = document.querySelector('.form');
// console.log(formRef);

formRef.addEventListener('submit', onPromise);

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({ position, delay });
        // Fulfill
      } else {
        rej({ position, delay });
        // Reject
      }
    }, delay);
  });
}

function onPromise(e) {
  e.preventDefault();
  const form = e.currentTarget;
  let delay = Number(form.elements.delay.value);
  let step = Number(form.elements.step.value);
  let amount = Number(form.elements.amount.value);

  for (let i = 0; i < amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}
