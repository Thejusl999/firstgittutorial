// REACT MODULE#3 - TASK-8: useReducer
// TASK: Implement the form validation by state updates using useReducer for password - Using useReducer to make multiple state updates

// Use reducer function to do form validations for password input field
/* All three approaches are shown below:
i)   Using different validations for different inputs
ii)  Using useEffect for single validation of both inputs
iii) Using useReducer for different validation of different inputs and managing them in reducer functions */

// Login.js code:
import React, { useState, useEffect, useReducer } from 'react';         //useEffect is for approaches i),ii) 
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
const emailReducer=(state, action)=>{                                  //iii) useReducer approach for email input
  if(action.type==='EMAIL_INPUT'){
    return {value:action.val, isValid:action.val.includes('@')}
  }
  if(action.type==='EMAIL-INPUT_BLUR'){
    return {value:state.value, isValid:state.value.includes('@')}
  }
  return {value:'', isValid:false}
};

const passwordReducer=(state,action)=>{                               //iii) useReducer approach for password input
  if(action.type==='PASSWORD_INPUT'){
    return {value:action.val, isValid:action.val.trim().length>6}
  }
  if(action.type==='PASSWORD-INPUT_BLUR'){
    return {value:state.value, isValid:state.value.trim().length>6}
  }
  return {value:'', isValid:false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');          //for approaches i),ii)
  // const [emailIsValid, setEmailIsValid] = useState();            //for approaches i),ii)
  // const [enteredPassword, setEnteredPassword] = useState('');    //for approaches i),ii)
  // const [passwordIsValid, setPasswordIsValid] = useState();      //for approaches i),ii)
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail]=useReducer(emailReducer, {
    value:'',
    isValid:null
  });                                                               //iii)useReducer approach for multiple states

  const [passwordState, dispatchPassword]=useReducer(passwordReducer, {
    value:'',
    isValid:null
  });                                                               //iii)useReducer approach for multiple states

  /*useEffect(()=>{                                                 //ii)useEffect approach for single validation
      const identifier= setTimeout(()=>{
        setFormIsValid(enteredEmail.includes('@')
        && enteredPassword.trim().length > 6);
      },500);
      return ()=>{
        clearTimeout(identifier);
      }
  },[enteredEmail,enteredPassword]); */

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);                                          //for approaches i) and ii)
    dispatchEmail({type:'EMAIL_INPUT',val:event.target.value});
    setFormIsValid(
      // event.target.value.includes('@') && enteredPassword.trim().length > 6       //i) approach having different validations
      event.target.value.includes('@') && passwordState.value.trim().length > 6      //iii) useReducer approach
    );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);       //for i) and ii) approaches
    dispatchPassword({type:'PASSWORD_INPUT',val:event.target.value})
    setFormIsValid(
      // enteredEmail.includes('@') && event.target.value.trim().length > 6         //i) approach having different validations 
      emailState.value.includes('@') && event.target.value.trim().length > 6        //iii) useReducer approach
    );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));                   //i) approach having different validations 
    dispatchEmail({type:'EMAIL-INPUT_BLUR'})                          //iii) useReducer approach
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(passwordState.value.trim().length > 6);     //i) approach having different validations
    dispatchPassword({type:'PASSWORD-INPUT_BLUR'})                    //iii) useReducer approach
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(enteredEmail, enteredPassword);                  //for approaches i) and ii)
    props.onLogin(emailState.value, passwordState.value);             //iii) useReducer approach
  }; 

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            // emailIsValid === false ? classes.invalid : ''         //for approaches i) and ii)
            emailState.isValid === false ? classes.invalid : ''      //iii) useReducer approach
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            // value={enteredEmail}                                 //for approaches i) and ii)
            value={emailState.value}                                //iii) useReducer approach
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            // passwordIsValid === false ? classes.invalid : ''     //for approaches i) and ii)
            passwordState.isValid === false ? classes.invalid : ''  //iii) useReducer approach
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            // value={enteredPassword}                              //for approaches i) and ii) 
            value={passwordState.value}                             //iii) useReducer approach
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
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