import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import { Row, Col, Container,Button} from "react-bootstrap";
import ComposeEmail from '../components/Layout/ComposeEmail';
import classes from './Home.module.css';

const HomePage = () => {
  const [showCompose,setShowCompose]=useState(false);
  const composeHandler=()=>{
    setShowCompose(!showCompose);
  }
  const history=useHistory();
  const logoutHandler=()=>{
    localStorage.clear();
    history.push('/');
  }
  return (
    <div className={classes.homepageDiv}> 
      <Row>
        <Col xs={12} className="text-start mt-2">
          <h6>
            <i>Welcome to your Mail Box!</i>
          </h6>
        </Col>
      </Row>
      <Button variant='danger' onClick={logoutHandler} className={classes.logoutBtn}>Logout</Button>
      <div
        style={{
          border: "none",
          backgroundColor: "black",
          height: "1px",
          marginTop: "3px",
          maxWidth:"100%"
        }}
      ></div>
      <Row>
        <Col className='d-flex'>
          <Col xs={1} className={classes.sideCol}>
            <Button variant="primary" className='mt-3 pt-3 pb-3' onClick={composeHandler}>Compose</Button><br></br>
            <Button variant="dark" className='mt-4'>Inbox</Button><br></br>
            <Button variant="dark" className='mt-2'>Sent</Button>
          </Col>
          <Col xs={10} className={classes.emailsCol}>
            {showCompose&&<ComposeEmail hideCompose={composeHandler}/>}
          </Col>
        </Col>
      </Row>
    </div>
  );
};
export default HomePage;
