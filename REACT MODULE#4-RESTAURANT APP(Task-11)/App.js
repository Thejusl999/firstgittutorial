import React,{useState, useCallback,useMemo} from 'react';
import DemoList from './components/UI/Button/DemoList';
import Button from './components/UI/Button/Button';
import './App.css';
function App() {
  const [listTitle,setListTitle]=useState('My List');
  const [buttonTitle,setButtonTitle]=useState('change to descending order');
  const changeTitleHandler=useCallback(()=>{
    setListTitle('New Title');
  },[])

  const listItems=useMemo(()=>[5,3,1,10,9],[])
  const changeListSorting=()=>{
    if(buttonTitle==='change to descending order'){
      listItems.sort((a,b)=>b-a);
      setButtonTitle('Change to Ascending Order');
    }else{
      listItems.sort((a,b)=>a-b);
      setButtonTitle('change to descending order');
    }
  }
  
  return (
    <div className="app">
      <DemoList title={listTitle} items={listItems}/>
      <Button onClick={changeTitleHandler}>Change List Title</Button>
      <Button onClick={changeListSorting}>{buttonTitle}</Button>
    </div>
  );
}
export default App;
