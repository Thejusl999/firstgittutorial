// '/' page
import TodosHome from "../components/todos/TodosHome";
const DUMMY_TODOS=[
  { 
    id:'r1',
    title:'Today'
  }
];
function HomePage(){
  return <TodosHome meetups={DUMMY_TODOS}/>
}
export default HomePage;