import { useState, useRef} from 'react';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailRef=useRef();
  const passwordRef=useRef();
  const confirmPasswordRef=useRef();
  const [isLoading,setIsLoading]=useState(false);
  async function sumbitHandler(e){
    e.preventDefault();
    const userEmail=emailRef.current.value;
    const userPassword=passwordRef.current.value;
    const confirmPassword=confirmPasswordRef.current.value;
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
      <section className={classes.auth}>
        <h1>SignUp</h1>
        <form onSubmit={sumbitHandler}>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input id='email' type='email' ref={emailRef} required/>
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input id='password' type='password' ref={passwordRef} required/>
          </div>
          <div className={classes.control}>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input id='confirmPassword' type='password' ref={confirmPasswordRef} required/>
          </div>
          {!isLoading?<div className={classes.actions}>
            <button>Sign up</button>
          </div>:<p>Signing you in...</p>}
        </form>
        <div className={classes.loginActions}>
          <button>Have an account? Login</button>
        </div>
      </section>
    </>
  );
};

export default AuthForm;
