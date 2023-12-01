import classes from './TodoDetail.module.css';
import { useSelector } from 'react-redux';
import Card from '../ui/Card';
import { useRouter } from 'next/router';

function TodoDetail(){
  const router=useRouter();
  const completedTasks=useSelector(state=>state.allTodos.doneTodos)
  const backBtnHandler=()=>{
    router.push('/todaytasks');
  }
  return (
    <Card>
      <button style={{cursor:'pointer',border:'none',background:'white',marginBottom:'3px',fontWeight:'bold'}} onClick={backBtnHandler}>Back ←</button>
      {completedTasks.length>0&&completedTasks.map(task=>(
        <li className={classes.item} key={task}>
          <div>
            <h3>{task}</h3>
          </div>
        </li>    
      ))}
      {completedTasks.length===0&&<p className={classes.noTodos}>No Completed Tasks!</p>}
    </Card>
  );
}

export default TodoDetail;