//   TASK-7 DOM MANIPULATIONS - CREATING NODES AND MODIFYING DOM   //

//TASK - FOLLOW YOUTUBER AND CODE ALONG
// Code with following keywords used to manipulate the DOM
let itemList=document.querySelector('#items');
//1.parentElement
console.log(itemList.parentElement);        //returns parent element of the itemList=div id:main
// 2.lastelementchild
console.log(itemList.lastElementChild);     //returns last element in the itemList=Item 4
// 3.lastchild
console.log(itemList.lastChild);            //returns the last item of the itemList=text node(line break)
// 4.createchild (or createElement)
let newChild=document.createElement('h1');  
console.log(newChild);                      //returns the new element created
// 5.firstelementchild
console.log(itemList.firstElementChild);    //returns the first element in the itemList=Item 1
// 6.firstchild
console.log(itemList.firstChild);           //returns the first item of the itemList=text node(line break)
// 7.nextsibling
console.log(itemList.nextSibling);          //returns next sibling to the itemList=text node(line break)
// 8.nextelementsibling
console.log(itemList.nextElementSibling);   //returns null as there is no element after the itemList(ul id:items)=null
// 9.previoussibling
console.log(itemList.previousSibling);      //returns previous sibling of itemList=text node(line break)
// 10.previouselementsibling
console.log(itemList.previousElementSibling);   //returns previous sibling element of itemList=h2 title
// 11.createelement
let newElement=document.createElement('div');   //element created
newElement.className='New Class';
newElement.id='Rule 1';
// 12.setAttribute
newElement.setAttribute('title','Item Category');   //attribute set to class of element-newElement
// 13.createtextnode
let newElementText=document.createTextNode('Italian-Dishes');     //creating content to push into the class
// 14.appendchild    
newElement.appendChild(newElementText);   //appending child to new element:newElement

//QUESTION-1 - Now go head and add HEllo word before Item Lister
let headingMsg=document.createElement('h1');            //creating new element
let headingMsgText=document.createTextNode('HEllo');    //creating text for new element
headingMsg.appendChild(headingMsgText);                 //appending text into the parent(headingMsg)
let newHeader=document.querySelector('header .container');  //selecting and setting class:container to newHeader
let head=document.querySelector('header h1');               //selecting and setting heading:h1 to head
newHeader.insertBefore(headingMsg,head);                    //inserting above created headingMsg before node:head inside the newHeader

//QUESTION-2 - Now go head and add HEllo word before Item 1
let subHeader=document.createElement('h4');             //creating new element
let subHeaderText=document.createTextNode('HEllo');     //creating text for new element
subHeader.appendChild(subHeaderText);                   //appending text into the parent(subHeader)
let itemHeader=document.querySelector('.list-group');                       //selecting and setting class:list-group to itemHeader
let firstItem=document.querySelector('.list-group-item:nth-child(1)');      //selecting and setting Item 1 to firstItem
itemHeader.insertBefore(subHeader,firstItem);                               //inserting above created subHeader before node:firstItem, inside the itemHeader