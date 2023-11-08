import React,{useState,useRef} from 'react';
import { Container,Row,Button } from 'react-bootstrap';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailRef=useRef();
  const passwordRef=useRef();
  const confirmPasswordRef=useRef();
  const [isLoading,setIsLoading]=useState(false);

  async function loginHandler(e){
    e.preventDefault();
    const userEmail=emailRef.current.value;
    const userPassword=passwordRef.current.value;
    const confirmPassword=confirmPasswordRef.current.value;
    if(userPassword===confirmPassword){
      setIsLoading(true);
      const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7xDQq0BB96b7YjsqWRsWh0Y5egMr92cM',{
        method:'POST',
        body:JSON.stringify({
          email:userEmail, 
          password:userPassword,
          returnSecureToken:true
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      });
      setIsLoading(false);
      if(response.ok){
        console.log('User has successfully signed up');
        emailRef.current.value='';
        passwordRef.current.value='';
        confirmPasswordRef.current.value='';
      }else{
        const data=await response.json();
        let errorMsg='Authentication failed';
        if(data&&data.error&&data.error.message){
          errorMsg=data.error.message;
        }
        alert(errorMsg);
      }
    }else{
      alert('Passwords do not match!');
    }
  }
  return (
    <>
      <Container className={classes.auth}>
        <Row className='p-3'>
          <h1>SignUp</h1>
          <form onSubmit={loginHandler}>
            <Row className={classes.control}>
              <label htmlFor='email'>Email</label>
              <input id='email' type='email' ref={emailRef} required/>
            </Row>
            <Row className={classes.control}>
              <label htmlFor='password'>Password</label>
              <input id='password' type='password' ref={passwordRef} required/>
            </Row>
            <Row className={classes.control}>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <input id='confirmPassword' type='password' ref={confirmPasswordRef} required/>
            </Row>
            {!isLoading&&(<Row className={classes.actions}>
              <Button variant="primary" type='submit '>Sign up</Button>
            </Row>)}
            {isLoading&&<p>Signing you in...</p>}
          </form>
        </Row>
      </Container>
      <Container className={classes.auth1}>
        <Button variant="info">Have an account? Login</Button>
      </Container>
    </>
  );
};
export default AuthForm;