import { useRef } from "react";
import Card from "../ui/Card";
import classes from "./NewTodoForm.module.css";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { tasksActions } from "../../store/allTodos";

function NewTodoForm(){
  const dispatch=useDispatch();
  const pendingTodos=useSelector(state=>state.allTodos.pendingTodos)
  const myTodos=useSelector(state=>state.allTodos)
  console.log(myTodos)
  const titleInputRef = useRef();
  let tag='t';
  function submitHandler(event) {
    event.preventDefault();
    const enteredTitle = titleInputRef.current.value;
    const newTodo = {
      id:`${tag}${pendingTodos.length+1}`,
      title: enteredTitle,
    };
    dispatch(tasksActions.setTodos(newTodo));
    titleInputRef.current.value='';
  }
  return (
    <>
      <Card>
        {pendingTodos.length>0&&<ul className={classes.list}>
          {pendingTodos.map((meetup) => (
            <TodoItem key={meetup.id} id={meetup.id} title={meetup.title} />
          ))}
        </ul>}
        {pendingTodos.length===0&&<p className={classes.noTodos}>No Tasks to do!</p>}
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
