import { useState, useRef, useContext } from 'react';
import {useHistory} from 'react-router-dom';
import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';

const AuthForm = () => {
  const emailRef=useRef();
  const passwordRef=useRef();
  const authCtx=useContext(AuthContext);
  const history=useHistory();
  
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setIsLoading]=useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  
  async function sumbitHandler(e){
    e.preventDefault();
    const userEmail=emailRef.current.value;
    const userPassword=passwordRef.current.value;
    setIsLoading(true);
    if(isLogin){
      const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAjrVEwwfFJ1ESLh8hh7JY0pHnojJnymZU',{
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
        localStorage.setItem(userEmail,data.idToken);
        history.push('/profile');
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
    }else{
      const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAjrVEwwfFJ1ESLh8hh7JY0pHnojJnymZU',{
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
        console.log('Signup Successful');
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
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={sumbitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required ref={passwordRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading&&<button >{isLogin?'Login':'Create Account'}</button>}
          {isLoading&&<p style={{color:'white'}}>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
