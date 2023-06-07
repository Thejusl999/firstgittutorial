//   TASK-4 DOM MANIPULATIONS   //

//QUESTION-1 - Write the code as per the youtuber does
let items=document.getElementsByClassName('list-group-item');
console.log(items);
console.log(items[1]);
items[1].textContent='Hello 2';
items[1].style.fontWeight='bold';
items[1].style.backgroundColor='yellow';
for(let i=0;i<items.length;i++) {
    items[i].style.backgroundColor='#ddd';
}

//QUESTION-2 - Make the 3rd element in the list have green background color
items[2].style.backgroundColor='green';

//QUESTION-3 - Make all the elements in the list have bold color font
for(let i=0;i<items.length;i++) {
    items[i].style.fontWeight='bold';
}