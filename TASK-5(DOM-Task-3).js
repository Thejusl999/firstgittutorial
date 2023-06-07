//   TASK-5 DOM MANIPULATIONS - GETELEMENTSBYTAGNAME   //
//QUESTION-1 - Add a new li element without the same class Name
<li class="new-list">Item 5</li>      //added to HTML CODE

//QUESTION-1.1 - And try editing it with getelementsbyclassname and then by getelementbytagname
//USING GETELEMENTSBYCLASSNAME
let items=document.getElementsByClassName('new-list');      //Accessing the element by new class name "new-list"
items[0].textContent='New Item';    //Changes the text to "New Item"

//USING GETELEMENTSBYTAGNAME
let li=document.getElementsByTagName('li');
li[4].textContent='New li Tag';     //Changes the text to "New li Tag"