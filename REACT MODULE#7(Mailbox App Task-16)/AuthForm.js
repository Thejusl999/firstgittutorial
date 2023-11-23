import React,{useState,useRef, useEffect} from 'react';
import { Container,Row,Button } from 'react-bootstrap';
import classes from './AuthForm.module.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch } from 'react-redux';
import { userDataActions } from '../../store/userData';
import useAuthFetch from '../CustomHooks/useAuthFetch';

const AuthForm = () => {
  const emailRef=useRef();
  const passwordRef=useRef();
  const confirmPasswordRef=useRef();
  const [isLoading,setIsLoading]=useState(false);
  const [isSignedUp,setIsSignedUp]=useState(true);
  const [showPassword,setShowPassword]=useState(false);
  const history=useHistory();
  const dispatch=useDispatch();
  
  const showLoginButton=()=>{
    setIsSignedUp(true);
  }
  const showSignInButton=()=>{
    setIsSignedUp(false);
  }
  const showPasswordHandler=(e)=>{
    e.preventDefault();
    setShowPassword(!showPassword);
    setTimeout(()=>setShowPassword(showPassword),500);
  }
  
  const {fetchData,data,response} = useAuthFetch();
  
  async function loginHandler(e){
    e.preventDefault();
    const userEmail=emailRef.current.value;
    const userPassword=passwordRef.current.value;
    const confirmPassword=!isSignedUp?confirmPasswordRef.current.value:'';
    if(!isSignedUp){
      if(userPassword===confirmPassword){
        setIsLoading(true);
        fetchData('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7xDQq0BB96b7YjsqWRsWh0Y5egMr92cM',userEmail,userPassword);
        /* const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7xDQq0BB96b7YjsqWRsWh0Y5egMr92cM',{
          method:'POST',
          body:JSON.stringify({
            email:userEmail, 
            password:userPassword,
            returnSecureToken:true
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        }); */
        /* const response1=null;
        setIsLoading(false);
        if(response.ok){
          console.log('User has successfully signed up');
          emailRef.current.value='';
          passwordRef.current.value='';
          confirmPasswordRef.current.value='';
          setIsSignedUp(true);
        }else{
          alert(error);
        } */
        if(response){
          console.log('User has successfully signed up');
          emailRef.current.value='';
          passwordRef.current.value='';
          confirmPasswordRef.current.value='';
          setIsSignedUp(true);
        }else if(data!==null){
          let errorMsg='Authentication failed';
          if(data&&data.error&&data.error.message){
            errorMsg=data.error.message;
          }
          if(errorMsg=='EMAIL_EXISTS'){
            window.location.reload();
            await setIsSignedUp(true);
          }
          alert(errorMsg);
        }else{
          alert('Signing you in...');
          setTimeout(alert('Could not signup, Retry!'),5000)
        }
        setIsLoading(false);
      }else{
        alert('Passwords do not match!');
      }
    }else{
      setIsLoading(true);
      fetchData('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7xDQq0BB96b7YjsqWRsWh0Y5egMr92cM',userEmail,userPassword)
      /* const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7xDQq0BB96b7YjsqWRsWh0Y5egMr92cM',{
        method:'POST',
        body:JSON.stringify({
          email:userEmail, 
          password:userPassword,
          returnSecureToken:true
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      }); */
      if(response){
        // const data=await response.json();
        localStorage.setItem(userEmail,data.idToken);
        dispatch(userDataActions.setIsLoggedIn());
        dispatch(userDataActions.setEmail(userEmail));
        dispatch(userDataActions.setToken(data.idToken));
        emailRef.current.value='';
        passwordRef.current.value='';
        history.push('/home');
      }else if(data!==null){
        // const data=await response.json();
        let errorMsg='Authentication failed';
        if(data&&data.error&&data.error.message){
          errorMsg=data.error.message;
        }
        alert(errorMsg);
      }else{
        alert('Logging you in...');
        setTimeout(alert('Could not login, Retry!'),5000)
      }
        setIsLoading(false);
      }
    }
  return (
    <>
      <Container className={classes.auth}>
        <Row className='p-3'>
          {!isSignedUp?<h1>SignUp</h1>:<h1>Login</h1>}
          <form onSubmit={loginHandler}>
            <Row className={classes.control}>
              <label htmlFor='email'>Email</label>
              <input id='email' type='email' ref={emailRef} required/>
            </Row>
            <Row className={classes.control}>
              <label htmlFor='password'>Password</label>
              <input id='password' type={showPassword?'text':'password'} ref={passwordRef} required/>
              {isSignedUp&&<button className={classes.img} onClick={showPasswordHandler} >
                {showPassword?<img src='/showP_Icon.png' alt='show password icon'/>:<img src='/hideP_Icon.png' alt='hide password icon'/>}
              </button>}
            </Row>
            {!isSignedUp&&<Row className={classes.control}>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <input id='confirmPassword' type='password' ref={confirmPasswordRef} required/>
            </Row>}
            {!isLoading&&(<Row className={classes.actions}>
              {!isSignedUp?<Button variant="primary" type='submit '>Sign up</Button>:<Button variant="primary" type='submit '>Login</Button>}
            </Row>)}
            {(isLoading&&!isSignedUp)&&<p>Signing you in...</p>}
            {(isLoading&&isSignedUp)&&<p>Logging you in...</p>}
          </form>
        </Row>
        <Row className='text-center'>
          {isSignedUp&&<Button variant='link' className={classes.forgotPasswordLink}>Forgot Password?</Button>}
        </Row>
      </Container>
      <Container className={classes.auth1}>
        {!isSignedUp?<Button variant="info" onClick={showLoginButton}>Have an account? Login</Button>:<Button variant="info" onClick={showSignInButton}>Don't have an account? Sign up</Button>}
      </Container>
    </>
  );
};
export default AuthForm;