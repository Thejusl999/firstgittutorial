//   TASK-8 DOM MANIPULATIONS - DELETE AND EDIT FUNCTIONALITY   //

//TASK - Watch the video  uptill the 15th min and learn how to add the delete button into your code
let form=document.getElementById('addForm');
let itemList=document.getElementById('items');
//creating an event to add new item to item list
form.addEventListener('submit', addEle);
function addEle(e) {
    e.preventDefault();
    //creating an li element as per the existing li's in HTML code
    let filledItem=document.getElementById('item').value;
    let li=document.createElement('li');
    li.className='list-group-item';
    li.appendChild(document.createTextNode(filledItem));
    //creating a button required to be a part of the li
    let newDeleteBtn=document.createElement('button');
    newDeleteBtn.className='btn btn-danger btn-sm float-right delete';
    newDeleteBtn.appendChild(document.createTextNode('X'));
    //appending the created btn into created li
    li.appendChild(newDeleteBtn);
    //appending entire li into the item list
    itemList.appendChild(li);
}

//QUESTION-1 - On clicking the delete button we should be able to remove the newly created li tag
//creating an event to remove item by clicking on the delete button in the li tag
itemList.addEventListener('click', removeLi);
function removeLi(e) {
    if(e.target.classList.contains('delete')) {
        if(confirm('Click on "OK" to Delete Item')) {
            itemList.removeChild(e.target.parentElement);
        }        
    }    
}

//QUESTION-2 - Now add an edit button next to the delete icon.[Dont have to build the Edit  functionality, just add the button]
let listOfItems=document.querySelectorAll('.list-group-item');
for(let i=0;i<listOfItems.length;i++) {
    let editBtn=document.createElement('button');
    editBtn.className='btn btn-info btn-sm float-right';
    editBtn.appendChild(document.createTextNode('Edit'));
    listOfItems[i].appendChild(editBtn);
}