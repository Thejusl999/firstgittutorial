import TodosHomeList from './TodosHomeList';
import classes from './TodosHome.module.css';

function TodosHome(props) {
  return (
    <>
      <h2 style={{textAlign:'center'}}>My Todos</h2>
      <ul className={classes.list}>
        {props.meetups.map((meetup) => (
          <TodosHomeList
            key={meetup.id}
            id={meetup.id}
            title={meetup.title}
          />
        ))}
      </ul>
    </>
  )
}

export default TodosHome;
