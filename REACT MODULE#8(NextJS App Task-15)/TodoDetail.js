import { useEffect,useState } from 'react';
import classes from './TodoDetail.module.css';
import Card from '../ui/Card';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { tasksActions } from '../../store/allTodos';

function TodoDetail(props){
  const [todos,setTodos]=useState([]);
  const dispatch=useDispatch();
  const router=useRouter();
  const backBtnHandler=()=>{
    router.push('/todaytasks');
  }
  useEffect(()=>{
    dispatch(tasksActions.clearAllTodos());
    if(props.props.length>0){
      props.props.map(task=>{
        if(task.status==='complete'){
          setTodos(prevTasks=>[...prevTasks,task]);
        }
      })
    }
  },[])
  return (
    <Card>
      <button style={{cursor:'pointer',border:'none',background:'white',marginBottom:'3px',fontWeight:'bold'}} onClick={backBtnHandler}>Back ←</button>
      {todos.length>0&&todos.map(task=>(
        <li className={classes.item} key={task.title}>
          <h3 style={{marginLeft:'1rem'}}>{task.title}</h3>
        </li>
      ))}
      {todos.length===0&&<p className={classes.noTodos}>No Completed Tasks!</p>}
    </Card>
  );
}

export default TodoDetail;