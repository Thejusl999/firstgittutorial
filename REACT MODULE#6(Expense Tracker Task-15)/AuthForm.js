import React,{useState,useRef,useContext} from 'react';
import {useHistory} from 'react-router-dom';
import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';
import { authActions } from '../../redux-store';
import { useDispatch } from 'react-redux';

const AuthForm = () => {
  const dispatch=useDispatch();

  const authCtx=useContext(AuthContext);
  const emailRef=useRef();
  const passwordRef=useRef();
  const confirmPasswordRef=useRef();
  const [isLoading,setIsLoading]=useState(false);
  const [isLoggedIn,setIsLoggedIn]=useState(false);

  const history=useHistory();
  const showLoginButton=()=>{
    setIsLoggedIn(true);
  }
  const showSignInButton=()=>{
    setIsLoggedIn(false);
  }
  async function sumbitHandler(e){
    e.preventDefault();
    const userEmail=emailRef.current.value;
    const userPassword=passwordRef.current.value;
    const confirmPassword=!isLoggedIn?confirmPasswordRef.current.value:'';
    if(!isLoggedIn){
      if(userPassword===confirmPassword){
        setIsLoading(true);
        const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBwiX430xFHd5MB3oS6n1PL12D4U7NBMnk',{
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
          setIsLoggedIn(true);
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
    }else{
      setIsLoading(true);
      const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBwiX430xFHd5MB3oS6n1PL12D4U7NBMnk',{
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
        const data=await response.json();
        authCtx.login(data.idToken);
        dispatch(authActions.login());
        localStorage.setItem(userEmail,data.idToken);
        history.push('/startPage');
        emailRef.current.value='';
        passwordRef.current.value='';
      }else{
        const data=await response.json();
        let errorMsg='Authentication failed';
        if(data&&data.error&&data.error.message){
          errorMsg=data.error.message;
        }
        alert(errorMsg);
      }
    }
  }
  const forgotPasswordHandler=()=>{
    history.push('/resetPassword');
  }
  return (
    <>
      <section className={classes.auth}>
        {!isLoggedIn?<h1>SignUp</h1>:<h1>Login</h1>}
        <form onSubmit={sumbitHandler}>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input id='email' type='email' ref={emailRef} required/>
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input id='password' type='password' ref={passwordRef} required/>
          </div>
          {!isLoggedIn&&<div className={classes.control}>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input id='confirmPassword' type='password' ref={confirmPasswordRef} required/>
          </div>}          
          {!isLoading&&(<div className={classes.actions}>
            {!isLoggedIn?<button>Sign up</button>:<button>Login</button>}
          </div>)}
          {isLoading&&!isLoggedIn&&<p>Signing you in...</p>}
          {isLoading&&isLoggedIn&&<p>Logging you in...</p>}
        </form>
        {isLoggedIn&&<div style={{textAlign:'center'}}><button style={{border:'none',fontSize:'14px',fontWeight:'bold'}} onClick={forgotPasswordHandler}>Forgot password?</button></div>}
        <div className={classes.loginActions}>
          {!isLoggedIn?<button onClick={showLoginButton}>Have an account? Login</button>:<button onClick={showSignInButton}>Don't have an account? Sign up</button>}
        </div>
      </section>
    </>
  );
};
export default AuthForm;