import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const buttonStartRef = document.querySelector('button[data-start]');
const dataPickerRef = document.querySelector('#datetime-picker');
const daysRemainRef = document.querySelector('span[data-days]');
const hoursRemainRef = document.querySelector('span[data-hours]');
const minutesRemainRef = document.querySelector('span[data-minutes]');
const secondsRemainRef = document.querySelector('span[data-seconds]');

buttonStartRef.addEventListener('click', handleButtonStartClick);
buttonStartRef.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date() >= selectedDates[0]) {
      return Notiflix.Report.warning('Please choose a date in the future');
    }
    buttonStartRef.removeAttribute('disabled');
  },
};

const setFlatpickr = flatpickr(dataPickerRef, options);

let intervalId = null;

function handleButtonStartClick() {
  buttonStartRef.setAttribute('disabled', true);

  intervalId = setInterval(() => {
    const timeRemain = setFlatpickr.selectedDates[0].getTime() - Date.now();
    if (timeRemain > 0) {
      renderTimer(convertMs(timeRemain));
      dataPickerRef.setAttribute('disabled', '');
    } else {
      clearInterval(intervalId);
      Notiflix.Report.info('Time is up!', '', 'OK');
      dataPickerRef.removeAttribute('disabled');
    }
  }, 1000);
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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function renderTimer({ days, hours, minutes, seconds }) {
  daysRemainRef.textContent = addLeadingZero(days);
  hoursRemainRef.textContent = addLeadingZero(hours);
  minutesRemainRef.textContent = addLeadingZero(minutes);
  secondsRemainRef.textContent = addLeadingZero(seconds);
}
