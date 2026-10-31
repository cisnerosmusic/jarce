'use strict';
const button = document.getElementById('b5');
const response = document.getElementById('response');
let reset;
button.addEventListener('click', () => {
  clearTimeout(reset);
  button.classList.add('active');
  response.textContent = 'B5 IS STILL ILLUMINATED.';
  reset = setTimeout(() => {
    button.classList.remove('active');
    response.textContent = 'THE SIGNAL REMAINS ACTIVE.';
  }, 7000);
});
