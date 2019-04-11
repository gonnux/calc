import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import './main.scss';

if('serviceWorker' in navigator) {
  window.addEventListener('load', () =>
    navigator.serviceWorker.register('serviceWorker.js')
    .then(registration => console.log('Service Worker registered'))
    .catch(err => console.log('Service Worker registration failed'))
  );
}

function getInput(eventTarget) {
  let input = null;
  if(eventTarget.matches('#button-0'))
    input = '0';
  else if(eventTarget.matches('#button-1'))
    input = '1';
  else if(eventTarget.matches('#button-2'))
    input = '2';
  else if(eventTarget.matches('#button-3'))
    input = '3';
  else if(eventTarget.matches('#button-4'))
    input = '4';
  else if(eventTarget.matches('#button-5'))
    input = '5';
  else if(eventTarget.matches('#button-6'))
    input = '6';
  else if(eventTarget.matches('#button-7'))
    input = '7';
  else if(eventTarget.matches('#button-8'))
    input = '8';
  else if(eventTarget.matches('#button-9'))
    input = '9';
  else if(eventTarget.matches('#button-plus'))
    input = '+';
  else if(eventTarget.matches('#button-minus'))
    input = '-';
  else if(eventTarget.matches('#button-multiply'))
    input = '*';
  else if(eventTarget.matches('#button-divide'))
    input = '/';
  else if(eventTarget.matches('#button-modulo'))
    input = '%';
  else if(eventTarget.matches('#button-dot'))
    input = '.';
  else if(eventTarget.matches('#button-clear'))
    input = 'clear';
  else if(eventTarget.matches('#button-delete'))
    input = 'delete';
  else if(eventTarget.matches('#button-equal'))
    input = 'equal';
  return input;
}

window.addEventListener('load', () => {
  const display = document.getElementById('display');
  const message = document.getElementById('message');
  if(!('serviceWorker' in navigator))
    message.style.display = 'block';
  display.dataset.data = '';
  document.addEventListener('click', (event) => {
    let input = getInput(event.target);
    if(input === 'equal')
      display.dataset.data = eval(display.dataset.data);
    else if(input === 'clear')
      display.dataset.data = '';
    else if(input === 'delete')
      display.dataset.data = display.dataset.data.slice(0, -1);
    else if(input !== null)
      display.dataset.data += input;
    display.innerHTML = display.dataset.data || '&nbsp;';
  });
  display.innerHTML = display.dataset.data || '&nbsp;';
});

window.addEventListener('online', () => {
  console.log("online event");
});
