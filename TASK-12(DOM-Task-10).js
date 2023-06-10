//   TASK-12 DOM MANIPULATIONS - LETS SCALE THE APP TO MORE USERS   //

//DELIVERABLE  -  Everytime you add a new user, the older user gets removed. Store all users submitted through the form

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

    //pushing the data into the Local Storage as an object
    class User {
        constructor(name,email) {
            this.name=name;
            this.email=email;
        }
    }
    let user=new User(nameInput.value, emailInput.value);
    user_serialized=JSON.stringify(user);
    localStorage.setItem(emailInput.value,user_serialized);

    nameInput.value = '';
    emailInput.value = '';
  }
}