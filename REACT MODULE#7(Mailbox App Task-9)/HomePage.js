import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button, Container } from "react-bootstrap";
import ComposeEmail from '../components/Layout/ComposeEmail';
import classes from './Home.module.css';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const myEmail = useSelector(state => state.userData.email);
  const [showCompose, setShowCompose] = useState(false);
  const [inboxItems, setInboxItems] = useState([]);
  const [showInbox,setShowInbox]=useState(true);
  const [mailObj,setMailObj]=useState({});
  const [unreadCount,setUnreadCount]=useState(0);
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
        let count=0;
        Object.entries(data).map(item => {
          setInboxItems(prevState => [...prevState, item[1]])
          if(item[1].status==='read'){
            count+=1;
          }
        })
        setUnreadCount(count);
      })
      .catch(err => console.log(err))
  }, [])
  async function emailLinkClickHandler(mail){
    setShowInbox(false);
    setMailObj(mail);
    const response=await fetch(`https://mailbox-app-1e6f1-default-rtdb.firebaseio.com/to-${mail.toEmail.replace(/[@.]/g,'')}.json`)
    if(!response.ok){
      throw new Error('GET Request unsuccessful!');
    }
    const data=await response.json();
    Object.entries(data).forEach(async(entity)=>{
      if(entity[1].emailBody===mail.emailBody){
        const res= await fetch(`https://mailbox-app-1e6f1-default-rtdb.firebaseio.com/to-${mail.toEmail.replace(/[@.]/g,'')}/${entity[0]}.json`,{
          method:'PUT',
          body:JSON.stringify({...mail,status:'read'})
        })
        if(!response.ok){
          throw new Error('PUT Request failed!');
        }
        console.log('Message status set to READ');
      }
    })
  }
  const backToInboxHandler=()=>{
    setShowInbox(true);
    window.location.reload();
  }
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
          <Col xs={2} className='border-right p-0 rounded bg-dark d-flex align-content-center justify-content-center overflow-hidden'>
            <Col xs={1} className={classes.sideCol}>
              <Button variant="primary" className='mt-3 pt-3 pb-3' onClick={composeHandler}>Compose</Button><br></br>
              <Button variant="dark" className='mt-3'>Inbox<div className={classes.showUnreadDiv}>{unreadCount} unread</div></Button><br></br>
              <Button variant="dark" className='mt-3'>Sent</Button>
            </Col>
          </Col>
          {showInbox&&<Col xs={10} className={classes.emailsCol}>
            {showCompose && <ComposeEmail hideCompose={composeHandler} />}
            <Col xs={10} className={classes.emails}>
              <h5>INBOX</h5>
            </Col>
            <Row className={classes.inboxItem}>
              {(inboxItems.length > 0&&showInbox) && inboxItems.map(mail => (
                <div className={classes.inboxDiv} key={Math.random()} onClick={()=>emailLinkClickHandler(mail)}>
                  <ul style={{ display: 'flex',paddingLeft:'10px',paddingRight:'5px'}}>
                    {mail.status==='read'?
                      <Col xs={3}>
                        <img src='/blank.png' className={classes.unreadStatus}/>
                        <li style={{display:'inline'}}>{mail.fromEmail}</li>
                      </Col>:
                      <Col xs={3} style={{fontWeight:'bold'}}>
                        <img src='/unread_Icon.png' className={classes.unreadStatus}/>
                        <li style={{display:'inline'}}>{mail.fromEmail}</li>
                      </Col>
                    }
                    <Col xs={5}>
                      {mail.status==='read'?<li>
                        <div style={{display:'inline',marginRight:'5px'}}>{mail.subject}</div> - <div style={{marginLeft:'5px',display:'inline'}}>{mail.emailBody}</div>
                      </li>:
                      <li>
                        <h6 style={{display:'inline',marginRight:'5px'}}>{mail.subject}</h6> - <div style={{marginLeft:'5px',display:'inline'}}>{mail.emailBody}</div>
                      </li>}
                    </Col>
                    {mail.status==='read'?
                      <Col xs={2} className='text-end'>
                        {mail.time.substring(0,2)<12?<li>{mail.time} AM</li>:<li>{mail.time} PM</li>}
                      </Col>:
                      <Col xs={2} className='text-end' style={{fontWeight:'bold'}}>
                        {mail.time.substring(0,2)<12?<li>{mail.time} AM</li>:<li>{mail.time} PM</li>}
                      </Col>
                    }
                  </ul>
                </div>
              ))} 
              {inboxItems.length === 0 && (
                <div className={classes.inboxDiv} key={Math.random()} style={{cursor:'default',boxShadow:'none'}}>
                  <ul style={{ display: 'flex',marginLeft:'-25px'}}>
                    <Col xs={10} className='text-center'>
                      <li>YOU HAVE NO MESSAGES !</li>
                    </Col>
                  </ul>
                </div>
              )}
            </Row>
          </Col>}
          {!showInbox&&<Col>
              {console.log('mailObj is',JSON.stringify(mailObj))}
                <Row className='ms-0 mt-1 mb-1' style={{fontWeight:'bold',cursor:'pointer'}} onClick={backToInboxHandler}>
                  <div>&larr;Back</div>
                </Row>
                <div className='border rounded border-primary' style={{margin:'0rem 0.5rem',overflow:'hidden'}}>
                  <Row className='ms-0 mt-2 '>
                    <h4>{mailObj.subject}</h4>
                    <hr></hr>
                    <div style={{marginTop:'-8px',fontWeight:'bold',marginBottom:'5px',fontSize:'15px'}}>From: &nbsp; &lt;{mailObj.fromEmail}&gt;</div>
                    <div style={{marginTop:'-8px',marginBottom:'5px',fontSize:'15px'}}>To: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;{mailObj.toEmail}&gt;</div>
                    <hr></hr>
                    <Container className='ms-0'>
                      <p>{mailObj.emailBody}</p>
                    </Container>
                  </Row>
                </div>
          </Col>}
        </Col>
      </Row>
    </div>
  );
};
export default HomePage;
