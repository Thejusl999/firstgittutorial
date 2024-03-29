import React,{useState} from 'react';
import { Row,Col,Container } from 'react-bootstrap';
import classes from './MailsList.module.css';
import useDataFetch from '../CustomHooks/useDataFetch';

const Inbox=(props)=>{
  const [showEmails,setShowEmails]=useState(true);
  const [mailObj,setMailObj]=useState({});
  const [id,setId]=useState(0)
  const {dataFetch,data,response,error} = useDataFetch();
  
  async function emailLinkClickHandler(mail){
    if(data!==null){
      setShowEmails(false);
    }
    setMailObj(mail);
    let mailBody={
      ...mail,
      status:'read'
    }
    /* const response=await fetch(`https://mailbox-app-1e6f1-default-rtdb.firebaseio.com/mails.json`)
    if(!response.ok){
      throw new Error('GET Request unsuccessful!');
    }
    const data=await response.json();
    Object.entries(data).forEach(async(entity)=>{
      if(entity[1].status==='unread'&&entity[1].emailBody===mail.emailBody){
        const response= await fetch(`https://mailbox-app-1e6f1-default-rtdb.firebaseio.com/mails/${entity[0]}.json`,{
          method:'PUT',
          body:JSON.stringify(mailBody)
        })
        if(!response.ok){
          throw new Error('PUT Request failed!');
        }
        if(response.ok)
          console.log('Email status set to READ');
      }
    }) */
    dataFetch(`https://mailbox-app-1e6f1-default-rtdb.firebaseio.com/mails.json`,'GET',{});
    if(response&&data!==null){
      Object.entries(data).forEach(async(entity)=>{
        if(entity[1].status==='unread'&&JSON.stringify(entity[1])===JSON.stringify(mail)){
          await dataFetch(`https://mailbox-app-1e6f1-default-rtdb.firebaseio.com/mails/${entity[0]}.json`,'PUT',mailBody)
          console.log('Email status set to READ')
        }
      })
    }else if(!response&&data===null&&error==='could not set email status to READ!'){    
      alert(error);
    }
  }
  if(id!==0){
    console.log('started')
    setTimeout(()=>dataFetch(`https://mailbox-app-1e6f1-default-rtdb.firebaseio.com/mails/${id}.json`,'DELETE',{}),5000)
    console.log('completed')
    setId(0)
  }
  async function deletemailHandler(e,mail){
    e.stopPropagation();
    /* const response=await fetch(`https://mailbox-app-1e6f1-default-rtdb.firebaseio.com/mails.json`)
    if(!response.ok){
      throw new Error('GET Request unsuccessful!');
    }
    const data=await response.json();
    Object.entries(data).forEach(async(entity)=>{
      if(entity[1].emailBody===mail.emailBody){
        const response= await fetch(`https://mailbox-app-1e6f1-default-rtdb.firebaseio.com/mails/${entity[0]}.json`,{
          method:'DELETE',
        })
        if(!response.ok){
          throw new Error('DELETE Request failed!');
        }
        alert('Email deleted!');
        window.location.reload();
      }
    }) */
    let mailElement=e.target.parentElement.parentElement;
    let mailBody={
      ...mail,
      status:'deleted'
    }
    // initial=false;
    dataFetch(`https://mailbox-app-1e6f1-default-rtdb.firebaseio.com/mails.json`,'GET',{});
    console.log(data,response,error)
    if(response&&data!==null){
      Object.entries(data).forEach(async(entity)=>{
        if(JSON.stringify(entity[1])===JSON.stringify(mail)){
          if (mailElement.parentNode) {
            mailElement.parentNode.removeChild(mailElement);
          }
          dataFetch(`https://mailbox-app-1e6f1-default-rtdb.firebaseio.com/mails/${entity[0]}.json`,'PUT',mailBody)
          setId(entity[0])
          alert('Email deleted!')
          // window.location.reload();
        }
      })
    }else if(!response&&data===null&&error==='could not delete email!'){    
      alert(error);
    }
  }
  const backToMailsHandler=()=>{
      setShowEmails(true);
      // if(props.title==='INBOX')
      //   window.location.reload();
  }
  return(
      <>
        {showEmails&&
        <><Col xs={10} className={classes.emails}>
          <h5>{props.title}</h5>
        </Col>
        <Row className={classes.inboxItem}>
          {props.mails.length > 0 ? props.mails.map(mail => (
            <div className={classes.inboxDiv} key={Math.random()} onClick={()=>emailLinkClickHandler(mail)}>
              <ul>
                {(props.title==='INBOX'&&mail.status==='unread')&&
                  <Col xs={3} style={{fontWeight:'bold'}}>
                    <img src='/unread_Icon.png' className={classes.unreadStatus} alt='Unread Status'/>
                    <li style={{display:'inline'}}>{mail.fromEmail}</li>
                  </Col>}
                {(props.title==='INBOX'&&mail.status==='read')&&
                  <Col xs={3}>
                    <img src='/blank.png' className={classes.unreadStatus} alt='Read Status'/>
                    <li style={{display:'inline'}}>{mail.fromEmail}</li>
                  </Col>
                }
                {props.title==='OUTBOX'&&
                  <Col xs={3}>
                    <img src='/blank.png' className={classes.unreadStatus} alt='Read Status'/>
                    <li style={{display:'inline'}}>{mail.toEmail}</li>
                  </Col>
                }
                <Col xs={4}>
                  {props.title==='INBOX'&&mail.status==='unread'?
                    <li>
                      <h6 style={{display:'inline',marginRight:'5px'}}>{mail.subject}</h6> - <div style={{marginLeft:'5px',display:'inline'}}>{mail.emailBody}</div>
                    </li>:
                    <li>
                      <div style={{display:'inline',marginRight:'5px'}}>{mail.subject}</div> - <div style={{marginLeft:'5px',display:'inline'}}>{mail.emailBody}</div>
                    </li>
                  }
                </Col>
                {props.title==='INBOX'&&mail.status==='unread'&&
                  <Col xs={3} className={classes.binIcon} style={{fontWeight:'bold'}}>
                    {mail.time.substring(7,9)<12?<li>{mail.time} AM</li>:<li>{mail.time} PM</li>}
                    <img src='/bin_Icon.jpeg' alt='Bin Icon' onClick={(e)=>deletemailHandler(e,mail)}/>
                  </Col>}
                {props.title==='INBOX'&&mail.status==='read'&&
                <Col xs={3} className={classes.binIcon}>
                  {mail.time.substring(7,9)<12?<li>{mail.time} AM</li>:<li>{mail.time} PM</li>}
                  <img src='/bin_Icon.jpeg' alt='Bin Icon' onClick={(e)=>deletemailHandler(e,mail)}/>
                </Col>}
                {props.title==='OUTBOX'&&
                <Col xs={3} className={classes.binIcon}>
                  {mail.time.substring(7,9)<12?<li>{mail.time} AM</li>:<li>{mail.time} PM</li>}
                  {/* <img src='/bin_Icon.jpeg' alt='Bin Icon' onClick={(e)=>deletemailHandler(e,mail)}/> */}
                </Col>}
              </ul>
            </div>
          )):(
            <div className={classes.inboxDiv} key={Math.random()} style={{cursor:'default',boxShadow:'none'}}>
              <ul>
                <Col xs={10} className='text-center'>
                  {props.title==='INBOX'?<li>YOU HAVE NO MESSAGES !</li>:<li>NO SENT MESSAGES YET !</li>}
                </Col>
              </ul>
            </div>
          )}
        </Row></>}
        {!showEmails&&
        <Col className=''>
          <Row className='ms-0 mt-1 mb-1' style={{fontWeight:'bold',cursor:'pointer'}} onClick={backToMailsHandler}>
            <div>&larr;Back</div>
          </Row>
          <Col xs={10} className='border rounded border-primary'>
            <Row className='ms-0 mt-2' style={{width:'100%'}}>
              <h4>{mailObj.subject}</h4>
              <hr></hr>
              <div style={{marginTop:'-8px',fontWeight:'bold',marginBottom:'5px',fontSize:'15px'}}>From: &nbsp; &lt;{mailObj.fromEmail}&gt;</div>
              <div style={{marginTop:'-8px',marginBottom:'5px',fontSize:'15px'}}>To: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;{mailObj.toEmail}&gt;</div>
              <hr></hr>
              <Container className='ms-0'>
                <p>{mailObj.emailBody}</p>
              </Container>
            </Row>
          </Col>
        </Col>}
    </>
  )    
}
export default Inbox;