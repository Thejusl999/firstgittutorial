//   TASK-13 DOM MANIPULATIONS - DELETE DATA FROM LOCAL STORAGE   //

//DELIVERABLE  -  Add a Delete Button, I want to be able to delete a few of them from the local storage as well as the UI.

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
    li.appendChild(document.createTextNode(`${nameInput.value}:${emailInput.value}`));
    

    let delBtn=document.createElement('input');
    delBtn.type='button';
    delBtn.className='deletebtn delete';
    delBtn.value='DELETE';
    //delBtn.appendChild(delValue);
    li.appendChild(delBtn);

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

userList.addEventListener('click',deleteItem);
function deleteItem(e) {
    if(e.target.classList.contains('delete')) {
        if(confirm('Click on "OK" to Delete Item')) {
            userList.removeChild(e.target.parentElement);
            let x=(e.target.parentElement.textContent).split(':');
            localStorage.removeItem(x[1]);
        }        
    }   
}