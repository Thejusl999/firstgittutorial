import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Container, Button } from "react-bootstrap";
import ComposeEmail from '../components/Layout/ComposeEmail';
import classes from './Home.module.css';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const myEmail = useSelector(state => state.userData.email);
  const [showCompose, setShowCompose] = useState(false);
  const [inboxItems, setInboxItems] = useState([]);
  const composeHandler = () => {
    setShowCompose(!showCompose);
  }
  const history = useHistory();
  const logoutHandler = () => {
    localStorage.clear();
    history.push('/');
  }
  useEffect(() => {
    fetch(`https://mailbox-app-1e6f1-default-rtdb.firebaseio.com/to-${myEmail.replace(/[@.]/g, '')}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('GET Network Error');
        }
        return response.json();
      })
      .then(data => {
        Object.entries(data).map(item => {
          setInboxItems(prevState => [...prevState, item[1]])
        })
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <div className={classes.homepageDiv}>
      <Row>
        <Col xs={12} className="text-start mt-2 ps-3 pe-3">
          <h6>
            <i>Welcome to your Mail Box!</i>
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
          <Col xs={2} className={classes.sideCol}>
            <Button variant="primary" className='mt-3 pt-3 pb-3' onClick={composeHandler}>Compose</Button><br></br>
            <Button variant="dark" className='mt-4'>Inbox</Button><br></br>
            <Button variant="dark" className='mt-2'>Sent</Button>
          </Col>
          <Col xs={10} className={classes.emailsCol}>
            {showCompose && <ComposeEmail hideCompose={composeHandler} />}
            <Col xs={10} className={classes.emails}>
              <h5>INBOX</h5>
            </Col>
            <Row className={classes.inboxItem}>
              {inboxItems.length > 0 && inboxItems.map(mail => (
                <div className={classes.inboxDiv} key={Math.random()}>
                  <ul style={{ display: 'flex',paddingLeft:'10px',paddingRight:'5px'}}>
                    <Col xs={3} className='fw-bold'>
                      <li>{mail.fromEmail}</li>
                    </Col>
                    <Col xs={5}>
                      <li>
                        <h6 style={{display:'inline',marginRight:'5px'}}>{mail.subject}</h6> - <div style={{marginLeft:'5px',display:'inline'}}>{mail.emailBody}</div>
                      </li>
                    </Col>
                    <Col xs={2} className='text-end fw-bold'>
                      {mail.time.substring(0,2)<12?<li>{mail.time} AM</li>:<li>{mail.time} PM</li>}
                    </Col>
                  </ul>
                </div>
              ))}
              {inboxItems.length === 0 && (
                <div className={classes.inboxDiv} key={Math.random()}>
                  <ul style={{ display: 'flex',marginLeft:'-25px'}}>
                    <Col xs={10} className='text-center'>
                      <li>YOU HAVE NO MESSAGES !</li>
                    </Col>
                  </ul>
                </div>
              )}
            </Row>
          </Col>
        </Col>
      </Row>
    </div>
  );
};
export default HomePage;
