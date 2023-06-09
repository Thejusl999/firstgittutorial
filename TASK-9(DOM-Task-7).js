//   TASK-9 DOM MANIPULATIONS - FILTER   //

//QUESTION-1 - When we type on the input box show me those items from the list which match my search string
let filter=document.getElementById('filter');
filter.addEventListener('keyup', filterItems);

function filterItems(e) {
    let filterText=e.target.value.toLowerCase();
    let items=document.getElementsByTagName('li');
    Array.from(items).forEach(function(item) {
        let itemName=item.firstChild.textContent;
        if((itemName.toLowerCase().indexOf(filterText)) != -1) {
            item.style.display='block';
        }
        else {
            item.style.display='none';
        }
    });
}

//QUESTION-2 - Now go ahead and take description of the item too in the input box where you are creating the item
let secondInput=document.createElement('input');
secondInput.type='text';
secondInput.className='form-control mr-2';
secondInput.id='description';
let formItem=document.getElementById('addForm');
let submitBtn=document.getElementsByClassName('btn btn-dark')[0];
formItem.insertBefore(secondInput,submitBtn);

let form=document.getElementById('addForm');
let itemList=document.getElementById('items');

form.addEventListener('submit', addItem);
function addItem(e) {
    e.preventDefault();
    let firstInputText=document.getElementById('item').value;
    let secondInputText=document.getElementById('description').value;
    let fullInput=firstInputText+' '+secondInputText;
    let newLi=document.createElement('li');
    newLi.className='list-group-item';
    newLi.appendChild(document.createTextNode(fullInput));

    let newDelBtn=document.createElement('button');
    newDelBtn.className='btn btn-danger btn-sm float-right delete';
    newDelBtn.appendChild(document.createTextNode('X'));
    
    newLi.appendChild(newDelBtn);
    itemList.appendChild(newLi);
}

//QUESTION-3 - When you are displaying the item show the description of the item below that
let form=document.getElementById('addForm');
form.addEventListener('submit', addItem);
function addItem(e) {
    e.preventDefault();
    let firstInputText=document.getElementById('item').value;
    let secondInputText=document.getElementById('description').value;
    let newLi=document.createElement('li');
    newLi.className='list-group-item';
    newLi.appendChild(document.createTextNode(firstInputText));

    let newDelBtn=document.createElement('button');
    newDelBtn.className='btn btn-danger btn-sm float-right delete';
    newDelBtn.appendChild(document.createTextNode('X'));
    
    newLi.appendChild(newDelBtn);
    newLi.appendChild(document.createElement('br'));
    newLi.appendChild(document.createTextNode(secondInputText));
    
    itemList.appendChild(newLi);
}

//QUESTION-4 - Now when we try to search, check both the name of the item and the description. If search string is found in any place show the item
let secondInput=document.createElement('input');
secondInput.type='text';
secondInput.className='form-control mr-2';
secondInput.id='description';
let formItem=document.getElementById('addForm');
let submitBtn=document.getElementsByClassName('btn btn-dark')[0];
formItem.insertBefore(secondInput,submitBtn);

let itemList=document.getElementById('items');

let form=document.getElementById('addForm');
form.addEventListener('submit', addItem);
function addItem(e) {
    e.preventDefault();
    let firstInputText=document.getElementById('item').value;
    let secondInputText=document.getElementById('description').value;
    let newLi=document.createElement('li');
    newLi.className='list-group-item';
    newLi.appendChild(document.createTextNode(firstInputText));

    let newDelBtn=document.createElement('button');
    newDelBtn.className='btn btn-danger btn-sm float-right delete';
    newDelBtn.appendChild(document.createTextNode('X'));
    
    newLi.appendChild(newDelBtn);
    newLi.appendChild(document.createElement('br'));
    newLi.appendChild(document.createTextNode(secondInputText));
    
    itemList.appendChild(newLi);
}

let filter=document.getElementById('filter');
filter.addEventListener('keyup', filterItems);

function filterItems(e) {
    let filterText=e.target.value.toLowerCase();
    let items=document.getElementsByTagName('li');
    Array.from(items).forEach(function(item) {
        let firstItem=item.firstChild.textContent;
        let lastItem=item.lastChild.textContent;
        if((firstItem.toLowerCase().indexOf(filterText)) != -1 || (lastItem.toLowerCase().indexOf(filterText)) != -1) {
            item.style.display='block';
        }
        else {
            item.style.display='none';
        }
    });
}