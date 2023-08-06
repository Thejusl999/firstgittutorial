// REACT MODULE#3 - TASK-7: Validating the forms (UseEffect)
// Using the useEffect hook to execute side effect codes and fetching the stored data

// TASK: Using local storage to store the information of user login i.e if logged in or not
// App.js code:
import React, { useState, useEffect } from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const storedUserInfo = localStorage.getItem('isLoggedIn');     //creates an infinite loop
  // if(storedUserInfo==='1'){
  //   setIsLoggedIn(true);
  // }
  useEffect(()=>{
    const storedUserInfo = localStorage.getItem('isLoggedIn');     //instead of putting this code out in the component put inside a function
    if(storedUserInfo==='1'){
      setIsLoggedIn(true);
    }
  },[])
  const loginHandler = (email, password, collegeName) => {
    localStorage.setItem('isLoggedIn','1');
    setIsLoggedIn(true);
  };
  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };
  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}
export default App;

// DELIVERABLE-1,2: To add a college name as required input field and to implement form validation for it
// Login.js code:
import React, { useState, useEffect } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredCollegeName, setenteredCollegeName] = useState('');

  const [emailIsValid, setEmailIsValid] = useState();
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [collegeNameIsValid, setCollegeNameIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);
  useEffect(()=>{
    setFormIsValid(
      enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollegeName.trim().length>1
    );
  },[enteredEmail,enteredPassword,enteredCollegeName]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };
  const collegeNameChangeHandler = (event) => {
    setenteredCollegeName(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };
  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };
  const validateCollegeNameHandler = () => {
    setCollegeNameIsValid(enteredPassword.trim().length > 1);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword, enteredCollegeName);
  };
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeNameIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="collegeName">College Name</label>
          <input
            type="text"
            id="collegeName"
            value={enteredCollegeName}
            onChange={collegeNameChangeHandler}
            onBlur={validateCollegeNameHandler}
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