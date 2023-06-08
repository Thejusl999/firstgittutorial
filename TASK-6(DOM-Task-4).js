//   TASK-6 DOM MANIPULATIONS - QUERYSELECTOR & QUERYSELECTORALL   //

//  QUERYSELECTOR   //
//QUESTION-1 - Make the 2nd item have green background color
let secondItem=document.querySelector('.list-group-item:nth-child(2)');
secondItem.style.backgroundColor='green';
//QUESTION-2 - Make the 3rd item invisible
let thirdItem=document.querySelector('.list-group-item:nth-child(3)');
thirdItem.style.color='#ffffff';

//  QUERYSELECTORALL    //
//QUESTION-1 - change the font color to green for 2nd item in the item list
let duoItem=document.querySelectorAll('.list-group-item');
duoItem[1].style.color='green';
//QUESTION-2 - Choose all the odd elements and make their background green
let odd=document.querySelectorAll('.list-group-item:nth-child(odd)'); 
for(let i=0;i<odd.length;i++) {
    odd[i].style.backgroundColor='green';
}