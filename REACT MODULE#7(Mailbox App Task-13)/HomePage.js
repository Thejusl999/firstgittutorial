import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button} from "react-bootstrap";
import ComposeEmail from '../components/Layout/ComposeEmail';
import classes from './Home.module.css';
import { useSelector,useDispatch } from 'react-redux';
import MailsList from '../components/Layout/MailsList';
import { allMailsActions } from '../store/allMails';

const HomePage = () => {
  const myEmail = useSelector(state => state.userData.email);
  const [showCompose, setShowCompose] = useState(false);
  const [inboxItems, setInboxItems] = useState([]);
  const [outboxItems, setOutboxItems] = useState([]);
  const [showInbox,setShowInbox]=useState(true);
  const [showOubox,setShowOutbox]=useState(false);
  const [unreadCount,setUnreadCount]=useState(0);
  const mails=useSelector(state=>state.mails.emails)  
  const dispatch=useDispatch();
  const history = useHistory();

  useEffect(() => {
    fetch(`https://mailbox-app-1e6f1-default-rtdb.firebaseio.com/mails.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error('GET Network Error');
      }
      return response.json();
    })
    .then(data => {
      let count=0;
      Object.entries(data).map(item => {
        dispatch(allMailsActions.pushMail(item[1]));
        if(item[1].fromEmail!==myEmail&&item[1].status==='unread'){
          count+=1;
        }
      })
      setUnreadCount(count);
    })
    .catch(err => console.log(err))
  }, [])
  useEffect(() => {
    mails.map(mail=>{
      if(mail.fromEmail!==myEmail){
        setInboxItems(prevState=>[...prevState,mail]);
      }else{
        setOutboxItems(prevState=>[...prevState,mail]);
      }
    })
  }, [mails])

  const composeHandler = () => {
    setShowCompose(!showCompose);
  }
  const inboxHandler=()=>{
    setShowInbox(true);
    setShowOutbox(false);
  }
  const outboxHandler=()=>{
    setShowInbox(false);
    setShowOutbox(true);
  }
  const logoutHandler = () => {
    localStorage.clear();
    history.push('/');
    dispatch(allMailsActions.clearMails());
  }
  return (
    <div className={classes.homepageDiv}>
      <Row>
        <Col xs={12} className="text-start mt-2 ps-3 pe-3">
          <h6>
            <i>{myEmail} Welcome to your Mail Box!</i>
          </h6>
          <Button variant='danger' onClick={logoutHandler} className={classes.logoutBtn}>Logout</Button>
        </Col>
      </Row>
      <div
        style={{
          border: "none",
          backgroundColor: "black",
          height: "1px",
          marginTop: "3px",
          maxWidth: "100%"
        }}
      ></div>
      <Row style={{height:'100vh'}}>
        <Col className='d-flex' style={{height:'100vh'}}>
          <Col xs={2} className='border-right p-0 rounded bg-dark d-flex align-content-center justify-content-center overflow-hidden'>
            <Col xs={1} className={classes.sideCol}>
              <Button variant="primary" className='mt-3 pt-3 pb-3' onClick={composeHandler}>Compose</Button><br></br>
              <Button variant="dark" className='mt-3' onClick={inboxHandler}>Inbox<div className={classes.showUnreadDiv}>{unreadCount} unread</div></Button><br></br>
              <Button variant="dark" className='mt-3' onClick={outboxHandler}>Sent</Button>
            </Col>
          </Col>
          <Col xs={10} className={classes.emailsCol}>
            {showCompose && <ComposeEmail hideCompose={composeHandler} />}
            {showInbox&&<MailsList mails={inboxItems} title='INBOX'/>}
            {showOubox&&<MailsList mails={outboxItems} title='OUTBOX'/>}
          </Col>
        </Col>
      </Row>
    </div>
  );
};
export default HomePage;