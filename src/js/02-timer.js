import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStartRef = document.querySelector('button[data-start]');
const dataPickerRef = document.querySelector('#datetime-picker');
const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minutesRef = document.querySelector('span[data-minutes]');
const secondsRef = document.querySelector('span[data-seconds]');

btnStartRef.addEventListener('click', onBtnStartClick);
btnStartRef.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date() >= selectedDates[0]) {
      return Notiflix.Report.warning('Please choose a date in the future');
    }
    btnStartRef.removeAttribute('disabled');
  },
};

const setFlatpickr = flatpickr(dataPickerRef, options);

let intervalId = null;

function onBtnStartClick() {
  btnStartRef.setAttribute('disabled', true);

  intervalId = setInterval(() => {
    const timeRemain = setFlatpickr.selectedDates[0].getTime() - Date.now();
    if (timeRemain > 0) {
      renderTimer(convertMs(timeRemain));
      dataPickerRef.setAttribute('disabled', '');
    } else {
      clearInterval(intervalId);
      Notiflix.Report.info('Time is over!');
      dataPickerRef.removeAttribute('disabled');
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function renderTimer({ days, hours, minutes, seconds }) {
  daysRef.textContent = addLeadingZero(days);
  hoursRef.textContent = addLeadingZero(hours);
  minutesRef.textContent = addLeadingZero(minutes);
  secondsRef.textContent = addLeadingZero(seconds);
}
