import classes from './MainNavigation.module.css';
import Link from 'next/link';
function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>React TodoList</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/completedtasks'>Completed Tasks</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
