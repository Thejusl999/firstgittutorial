// REACT MODULE#3 - TASK-11: ForwardRef
// Using the useRef, useImperativeHandle and React.forwardRef to implement the focus functionality

// Input.js code:   
// import React,{useRef, useEffect} from "react";
import React,{useRef, useImperativeHandle} from "react";
import classes from './Input.module.css';
const Input = React.forwardRef((props,ref) => {
  const inputRef=useRef();
  /* useEffect(()=>{                //works but the password input gets focused first as the email input was temporarily focused
    inputRef.current.focus();
  },[]) */
  const activate=()=>{              //this doesn't work like this (so import useImperativeHandle hook and wrap the Input component with forwardRef)
    inputRef.current.focus();
  }
  useImperativeHandle(ref,()=>{
    return {focus:activate};
  });
  return (
    <div className={`${classes.control} ${props.isValid === false ? classes.invalid : ""}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef} type={props.type} id={props.id} value={props.value} onChange={props.onChange} onBlur={props.onBlur}
      />
    </div>
  );
});
export default Input;

// Login.js code:
import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';
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
  const emailInputRef=useRef();
  const passwordInputRef=useRef();

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
    if(formIsValid){                         //implementing focus functionality based on conditions of isValid
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if(!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          ref={emailInputRef}               // using the ref for implementing focus functionality
          id="email" label="E-Mail" type="email" isValid={emailIsValid} value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}            // using the ref for implementing focus functionality
          id="password" label="Password" type="password" isValid={passwordIsValid} value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default Login;