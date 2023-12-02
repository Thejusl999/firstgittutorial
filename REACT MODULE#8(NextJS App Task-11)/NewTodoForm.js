import { useEffect, useRef, useState} from "react";
import Card from "../ui/Card";
import classes from "./NewTodoForm.module.css";
import TodoItem from "./TodoItem";
import { useDispatch } from "react-redux";
import { tasksActions } from "../../store/allTodos";

function NewTodoForm(props){
  console.log(props)
  const dispatch=useDispatch();
  const [todos,setTodos]=useState([]);
  useEffect(()=>{
    setTodos(props.props);
    props.props.map(task=>{
      dispatch(tasksActions.setTodos(task));
    })
  },[])
  const titleInputRef = useRef();
  let tag='t';
  function submitHandler(event) {
    event.preventDefault();
    const enteredTitle = titleInputRef.current.value;
    const newTodo = {
      id:`${tag}${todos.length+1}`,
      title: enteredTitle,
    };
    dispatch(tasksActions.setTodos(newTodo));
    setTodos(prevTodos=>[...prevTodos,newTodo]);
    titleInputRef.current.value='';
    props.onAddTodo(newTodo);
  }
  return (
    <>
      <Card>
        {todos.length>0&&<ul className={classes.list}>
          {todos.map((meetup) => (
            <TodoItem key={meetup.id} id={meetup.id} title={meetup.title} />
          ))}
        </ul>}
        {todos.length===0&&<p className={classes.noTodos}>No Tasks to do!</p>}
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