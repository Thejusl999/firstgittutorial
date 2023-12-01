import Link from 'next/link';
import Card from '../ui/Card';
import classes from './TodosHomeList.module.css';

function TodosHomeList(props) {
  let todayDate=new Date();
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{`${props.title} - ${todayDate.getDate()} ${todayDate.toLocaleString('default', { month: 'short' })} ${todayDate.getFullYear()}`}</h3>
        </div>
        <div className={classes.actions}>
          <button>
            <Link href={`/${props.title.toLowerCase()}tasks`}>
              Show Todos
            </Link>
          </button>
        </div>
      </Card>
    </li>
  );
}

export default TodosHomeList;