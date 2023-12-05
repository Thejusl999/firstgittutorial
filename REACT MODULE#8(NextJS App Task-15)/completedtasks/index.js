// '/completedtasks' page
import { MongoClient } from "mongodb";
import TodoDetail from "../../components/todos/TodoDetail";
function IndividualMeetup(props){
  return <TodoDetail props={props.todos}/>;
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
export default IndividualMeetup;