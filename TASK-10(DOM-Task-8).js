//   TASK-9 DOM MANIPULATIONS - FILTER   //

/*
DELIVERABLE  -  Write logic to store the details entered by the user
                in the local storage when he clicks on submit. Watch
                this video to understand the agorithm that you can use.
*/
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

myForm.addEventListener('submit', onSubmit);
function onSubmit(e) {
  e.preventDefault();
  if(nameInput.value === '' || emailInput.value === '') {
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';
    setTimeout(() => msg.remove(), 3000);
  }
  else {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${nameInput.value}: ${emailInput.value}`));
    userList.appendChild(li);
    //pushing the data entered by user into the Local Storage
    localStorage.setItem('Name',nameInput.value);
    localStorage.setItem('Email',emailInput.value);

    nameInput.value = '';
    emailInput.value = '';
  }
}