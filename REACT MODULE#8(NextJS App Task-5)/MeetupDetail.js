import classes from './MeetupDetail.module.css';

function MeetupDetail(props) {
  console.log(props.props)
  return (
    <li className={classes.item}>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
    </li>
  );
}

export default MeetupDetail;
