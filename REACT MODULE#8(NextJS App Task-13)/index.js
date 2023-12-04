// '/today' page
import { MongoClient } from "mongodb";
import NewTodoForm from "../../components/todos/NewTodoForm";
import { useSelector } from "react-redux";

function NewTodoPage(props) {
  const pendingTodos=useSelector(state=>state.allTodos.pendingTodos);
  async function addTodoHandler(newTodo){
    const response=await fetch('/api/modifyTodos',{
        method:'POST',
        body:JSON.stringify(newTodo),
        headers:{
            'Content-Type':'application/json'
        }
    });

    const data=await response.json();
    console.log(data);
    if(data.message==='Todo inserted!')
      alert('Todo Added Successfully');
  }

  async function completeTodoHandler(todo){
    let completedTodo;
    pendingTodos.map(task=>{
      if(task.title===todo){
        completedTodo=task;
      }
    })
    if(pendingTodos.length>0){
      const response=await fetch('/api/modifyTodos',{
        method:'PUT',
        body:JSON.stringify(completedTodo),
        headers:{
            'Content-Type':'application/json'
        }
      });
      const data=await response.json();
      console.log(data);
      if(data.message==='Todo completed!')
        alert('Todo Completed Successfully!');
      else{
        alert('Could not add Task!');
        window.location.reload();
      }
    }
  }
  return <NewTodoForm onAddTodo={addTodoHandler} props={props.todos} onCompleteTodo={completeTodoHandler}/>;
}
export async function getStaticProps() {
  const client=await MongoClient.connect('mongodb+srv://tj999:tjtest@cluster0.9vuybed.mongodb.net/todos?retryWrites=true&w=majority');
  const db=client.db();
  const todosCollection=db.collection('todos');
  const todos=await todosCollection.find().toArray();
  client.close();
  return {
    props: {
      todos: todos.map(task=>({
        title:task.title,
        id:task._id.toString(),
        status:task.status
      })),
    },
    revalidate: 1,
  };
}
export default NewTodoPage;
