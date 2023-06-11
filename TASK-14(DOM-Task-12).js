//   TASK-14 DOM MANIPULATIONS - EDIT BUTTON   //

//DELIVERABLE  -  By mistake you have added the wrong email id. Lets edit and fix it.

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

    let editBtn=document.createElement('input');
    editBtn.type='button';
    editBtn.className='editbtn edit';
    editBtn.value='EDIT';
    li.appendChild(editBtn);

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

userList.addEventListener('click',editItem);
function editItem(e) {
    if(e.target.classList.contains('edit')) {
        if(confirm('Click on "OK" to Edit Item')) {
            userList.removeChild(e.target.parentElement);
            let detailsArr=(e.target.parentElement.textContent).split(':');
            let nameField=document.getElementById('name');
            let emailField=document.getElementById('email');
            nameField.value=detailsArr[0];
            emailField.value=detailsArr[1];
            localStorage.removeItem(detailsArr[1]);
        }        
    }   
}