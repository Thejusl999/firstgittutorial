// '/today' page
import { MongoClient } from "mongodb";
import NewTodoForm from "../../components/todos/NewTodoForm";

function NewTodoPage(props) {
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

  return <NewTodoForm onAddTodo={addTodoHandler} props={props.todos}/>;
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
        id:task._id.toString()
      })),
    },
    revalidate: 1,
  };
}
export default NewTodoPage;
