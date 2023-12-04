import { useEffect, useRef, useState} from "react";
import Card from "../ui/Card";
import classes from "./NewTodoForm.module.css";
import TodoItem from "./TodoItem";
import { useDispatch,useSelector } from "react-redux";
import { tasksActions } from "../../store/allTodos";

function NewTodoForm(props){
  const dispatch=useDispatch();
  const [todos,setTodos]=useState([]);
  const completedTodosLen=useSelector(state=>state.allTodos.doneTodos.length);
  const allTodos=useSelector(state=>state.allTodos);
  console.log(allTodos)
  useEffect(()=>{
    if(props.props.length>0){
      props.props.map(task=>{
        if(task.status==='incomplete'){
          dispatch(tasksActions.setTodos(task));
          setTodos(props.props);
        }
        else if(task.status==='complete'){
          dispatch(tasksActions.setCompletedTodos(task));
        }
      })
    }
  },[])
  const titleInputRef = useRef();
  let tag='t';
  function submitHandler(event) {
    event.preventDefault();
    const enteredTitle = titleInputRef.current.value;
    const newTodo = {
      id:`${tag}${todos.length+1}`,
      title: enteredTitle,
      status:"incomplete"
    };
    console.log(newTodo)
    dispatch(tasksActions.setTodos(newTodo));
    setTodos(prevTodos=>[...prevTodos,newTodo]);
    titleInputRef.current.value='';
    props.onAddTodo(newTodo);
  }
  const completeTaskProps=(task)=>{
    props.onCompleteTodo(task);
    if(todos.length+completedTodosLen===allTodos.pendingTodos.length+completedTodosLen){
      setTodos([]);
    }
  }
  return (
    <>
      <Card>
        {console.log(todos.length,completedTodosLen)}
        {todos.length>0&&<ul className={classes.list}>
          {todos.map((todo) => (
            <div key={todo.id}>{todo.status==='incomplete'&&<TodoItem key={todo.id} id={todo.id} title={todo.title} onCompleteTask={completeTaskProps}/>}</div>
          ))}
        </ul>}
        {(todos.length===0&&completedTodosLen>0)&&<p className={classes.noTodos}>No Pending Tasks to do!</p>}
      </Card>
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <input
              type="text"
              required
              id="title"
              placeholder="Add Task"
              ref={titleInputRef}
            />
          </div>
          <div className={classes.actions}>
            <button>
              Add Task
            </button>
          </div>
        </form>
      </Card>
    </>
  );
}
export default NewTodoForm;