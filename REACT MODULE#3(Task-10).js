// REACT MODULE#3 - TASK-10: Rules of Hooks

// 1) migrating from AuthContext.Provider code in App component to AuthContextProvider pattern
// auth-context.js code:    (created a context provider component inside auth-context to make App component lean)
import React, {useState, useEffect} from 'react';
const AuthContext=React.createContext({
    isLoggedIn:false,
    onLogout: ()=>{},    //so that the ide shows the onLogout suggestion
    onLogin: (email,password)=>{}
});

// moving all login and logout code from App component into this named component
export const AuthContextProvider=props=>{
    const [isLoggedIn, setIsLoggedIn]=useState(false);
    useEffect(()=>{
        const storedUserInfo = localStorage.getItem('isLoggedIn');
        if(storedUserInfo==='1'){
          setIsLoggedIn(true);
        }
      },[])
    const loginHandler=()=>{
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn','1');
    };
    const logoutHandler=()=>{
        setIsLoggedIn(false)
        localStorage.removeItem('isLoggedIn');
    };
    return <AuthContext.Provider 
        value={{
            isLoggedIn:isLoggedIn,
            onLogout:logoutHandler,
            onLogin:loginHandler
        }}>{props.children}
    </AuthContext.Provider>;
}
export default AuthContext;

// App.js code: (removed login and logout code as it is transfer into auth-context)
// import React, { useState, useEffect } from 'react';  //removed useEffect as moved into auth-context
import React, {useContext} from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';
function App() {
  const ctx=useContext(AuthContext);
  /* const [isLoggedIn, setIsLoggedIn] = useState(false); 
  useEffect(()=>{
    const storedUserInfo = localStorage.getItem('isLoggedIn');     //instead of putting this code out in the component put inside a function
    if(storedUserInfo==='1'){
      setIsLoggedIn(true);
    }
  },[])
  // const loginHandler = (email, password, collegeName) => {      //used for task to add another input (i.e. collegeName)
    const loginHandler = (email, password,) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn','1');
    setIsLoggedIn(true);
  };
  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  }; */                                                           //entire code inside comment block moved to auth-context file
  return (
    /* <AuthContext.Provider value={{     //removed as we will be using AuthContext directly in the index.js file
      isLoggedIn:isLoggedIn,
      onLogout: logoutHandler
    }}> */
    <React.Fragment>
      <MainHeader/>
      <main>
        {/* {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}           removed login & logout as it is moved to auth-context file */}
        {!ctx.isLoggedIn && <Login/>}
        {ctx.isLoggedIn && <Home/>}
      </main>
    </React.Fragment>
    // </AuthContext.Provider>           //removed as we will be using AuthContext directly in the index.js file
  );
}
export default App;

// index.js code: (wrapping with the context provider in the topmost file executed)
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);

// i) using useContext in all components
// Home.js code:
import React, {useContext} from 'react';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import AuthContext from '../../store/auth-context';
const Home = () => {
  const authCtx=useContext(AuthContext);
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      {/* <Button onClick={props.onLogout}>Logout</Button>       using useContext & replacing props with context data*/}  
      <Button onClick={authCtx.onLogout}>Logout</Button>
    </Card>
  );
};
export default Home;

// Navigation.js code:
import React, {useContext} from 'react';
import AuthContext from '../../store/auth-context';
import classes from './Navigation.module.css';
const Navigation = () => {
  const ctx=useContext(AuthContext);
  return (
    <nav className={classes.nav}>
    <ul>
        {ctx.isLoggedIn && (
        <li>
            <a href="/">Users</a>
        </li>
        )}
        {ctx.isLoggedIn && (
        <li>
            <a href="/">Admin</a>
        </li>
        )}
        {ctx.isLoggedIn && (
        <li>
            <button onClick={ctx.onLogout}>Logout</button>
        </li>
        )}
    </ul>
    </nav>
  );
};
export default Navigation;

// 2) Creating reusable Input component (to use for all inputs)
// Input.js code:   (reuseable input component created)
import React from "react";
import classes from './Input.module.css';
const Input = (props) => {
  return (
    <div className={`${classes.control} ${props.isValid === false ? classes.invalid : ""}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type} id={props.id} value={props.value} onChange={props.onChange} onBlur={props.onBlur}
      />
    </div>
  );
};
export default Input;

// Login.js code:   (replacing the input <div>'s with the Input Component)
import React, { useState, useEffect, useReducer, useContext } from 'react';
import Input from '../UI/Input/Input';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const emailReducer=(state, action)=>{                                  
  if(action.type==='USER_INPUT'){
    return {value:action.val, isValid:action.val.includes('@')}
  }
  if(action.type==='INPUT_BLUR'){
    return {value:state.value, isValid:state.value.includes('@')}
  }
  return {value:'', isValid:false}
};

const passwordReducer=(state,action)=>{                               
  if(action.type==='USER_INPUT'){
    return {value:action.val, isValid:action.val.trim().length>6}
  }
  if(action.type==='INPUT_BLUR'){
    return {value:state.value, isValid:state.value.trim().length>6}
  }
  return {value:'', isValid:false}
}

const Login = () => {
  const authCtx=useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail]=useReducer(emailReducer, {
    value:'',
    isValid:null
  });                                                  
  const [passwordState, dispatchPassword]=useReducer(passwordReducer, {
    value:'',
    isValid:null
  });                                                  
  
  useEffect(()=>{                                   
    console.log('EFFECT RUNNING');
    return ()=>{
      console.log('EFFECT CLEANUP');
    };
  },[]);

  /* useEffect(()=>{                                  //ii)useEffect approach to have single validation for all inputs
    const identifier= setTimeout(()=>{
      // console.log('Checking form validity');
      setFormIsValid(
        enteredEmail.includes('@')
        && enteredPassword.trim().length > 6 
        // && enteredCollegeName.trim().length>1
      );
    },500);
    return ()=>{
      // console.log('CLEANUP');
      clearTimeout(identifier);
    }
  },[enteredEmail,
    enteredPassword,
    // enteredCollegeName
  ]); */

  const {isValid:emailIsValid}=emailState;
  const {isValid:passwordIsValid}=passwordState;

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT',val:event.target.value});
    setFormIsValid(
      event.target.value.includes('@') && passwordState.value.trim().length > 6 
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'USER_INPUT',val:event.target.value})
    setFormIsValid(
      emailState.value.includes('@') && event.target.value.trim().length > 6       
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'})                        
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        {/* <div className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''}`}
        >
          <label htmlFor="email">E-Mail</label>
          <input 
            type="email" id="email" value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler}
          />
        </div>
        <div className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''}`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password" id="password" value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler}
          />
        </div> */}

        {/* Using reuseable Input component for all inputs */}
        <Input 
          id="email" label="E-Mail" type="email" isValid={emailIsValid} value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler}
        />
        <Input 
          id="password" label="Password" type="password" isValid={passwordIsValid} value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default Login;
