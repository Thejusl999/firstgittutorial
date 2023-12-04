import { useDispatch, useSelector } from 'react-redux';
import classes from './TodoItem.module.css';
import { tasksActions } from '../../store/allTodos';

function TodoItem(props) {
  const dispatch=useDispatch();
  const storedTodos=useSelector(state=>state.allTodos.pendingTodos);
  const deleteTodoHandler=async(e)=>{
    e.preventDefault();
    let oldTodos=storedTodos;
    dispatch(tasksActions.clearAllTodos());
    let task=e.target.parentElement.parentElement.firstChild.lastChild.textContent;
    oldTodos.map(todo=>{
      if(task!==todo.title){
        dispatch(tasksActions.setTodos(todo));
      }
    })
    dispatch(tasksActions.setDeletedTodos(task));
    await props.onDeleteTask(task);
    e.target.parentElement.parentElement.remove();
  }
  const completeTaskHandler=async(e)=>{
    e.preventDefault();
    let oldTodos=storedTodos;
    dispatch(tasksActions.clearAllTodos());
    let task=e.target.parentElement.parentElement.firstChild.lastChild.textContent;
    oldTodos.map(todo=>{
      if(task!==todo.title){
        dispatch(tasksActions.setTodos(todo));
      }
    })
    dispatch(tasksActions.setCompletedTodos(task));
    await props.onCompleteTask(task);
    e.target.parentElement.parentElement.remove();
  }
  return (
    <li className={classes.item} key={props.id}>
      <div className={classes.content}>
        <button onClick={completeTaskHandler}>✔</button>
        <h3>{props.title}</h3>
      </div>
      <div className={classes.actions}>
        <button onClick={deleteTodoHandler}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;