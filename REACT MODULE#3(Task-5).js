// REACT MODULE#3 - TASK-5: JSX limitation and solution

// 1) Wrapper Component which doesn't render anything but is just used to wrap all elements to avoid <div> soup)
// Wrapper.js code:
const Wrapper=props=>{
    return props.children;
};
export default Wrapper;
// In NewUser.js code: (using the Wrapper component to wrap elements inside return statement)
import React, { useState } from "react";
import ErrorModal from "../UI/ErrorModal";
import Card from "../UI/Card";
import Wrapper from "../Helpers/Wrapper";
import './NewUser.css';
const NewUser = (props) => {
  const [nameInput, setNameInput] = useState("");
  const [ageInput, setAgeInput] = useState("");
  const [error, setError]=useState();
  const nameChangeHandler = (e) => {
    setNameInput(e.target.value);
  };
  const ageChangeHandler = (e) => {
    setAgeInput(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if(nameInput.length===0||ageInput===0){
      setError({
        title: 'Invalid input',
        message: "Please enter a valid name and age (non-empty values)."
      })
      return;
    }
    if(ageInput<1){
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (>0).'
      })
      return;
    }
    props.onAddUser(nameInput,ageInput);
    setNameInput("");
    setAgeInput("");
  };
  const errorHandler=()=>{
    setError(null);
  }
  return (
    <Wrapper>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-controls">
            <label>Username</label>
            <input
              className="form-inputs"
              type="text"
              value={nameInput}
              onChange={nameChangeHandler}
            />
          </div>
          <div className="form-controls">
            <label>Age (Years)</label>
            <input
              className="form-inputs"
              type="number"
              value={ageInput}
              onChange={ageChangeHandler}
            />
          </div>
          <button className="form-actions" type="submit">
            Add User
          </button>
        </form>
      </Card>
    </Wrapper>
  );
};
export default NewUser;

// 2) Using In-Built React Fragement to wrap instead of creating a custom wrapper component (3 ways)
// In App.js code: 
// (i) Using <React.Fragment> tag
import React, { useState } from "react";
import UsersList from "./components/Users/UsersList";
import NewUser from "./components/Users/NewUser";
import "./App.css";
const App = () => {
  const [users, setUsers] = useState([]);
  const addUserHandler = (userName, userAge) => {
    setUsers((prevUsers) => {
      return [...prevUsers,{ name: userName, age: userAge, id: Math.random().toString() },];
    });
  };
  return (
    <React.Fragment>
      <NewUser onAddUser={addUserHandler} />
      <UsersList items={users} />
    </React.Fragment>
  );
};
export default App;
// (ii) Importing {Fragment} and using <Fragment> tag
import React, { useState, Fragment } from "react";
import UsersList from "./components/Users/UsersList";
import NewUser from "./components/Users/NewUser";
import "./App.css";
const App = () => {
  const [users, setUsers] = useState([]);
  const addUserHandler = (userName, userAge) => {
    setUsers((prevUsers) => {
      return [...prevUsers,{ name: userName, age: userAge, id: Math.random().toString() },];
    });
  };
  return (
    <Fragment>
      <NewUser onAddUser={addUserHandler} />
      <UsersList items={users} />
    </Fragment>
  );
};
export default App;
// (iii) Using just the <> tag
import React, { useState } from "react";
import UsersList from "./components/Users/UsersList";
import NewUser from "./components/Users/NewUser";
import "./App.css";
const App = () => {
  const [users, setUsers] = useState([]);
  const addUserHandler = (userName, userAge) => {
    setUsers((prevUsers) => {
      return [...prevUsers,{ name: userName, age: userAge, id: Math.random().toString() },];
    });
  };
  return (
    <>
      <NewUser onAddUser={addUserHandler} />
      <UsersList items={users} />
    </>
  );
};
export default App;

// 3) Using React.DOM.createPortal() method to move overlay/backdrop components/modals to desired location
// i) index.html code: (Creating <div> containers in public html file)
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
  </body>
</html>
// ii) ErrorModal.js code: (Importing ReactDOM and using ReactDOM.createPortal() method to move a backdrop/overlay component in the DOM to the created location(container))
import React from "react";
import ReactDOM from 'react-dom';
import classes from './ErrorModal.module.css'
import '../Users/NewUser.css';
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm}></div>;
}
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.actions}>
        <button className='form-actions' onClick={props.onConfirm}>OK</button>
      </footer>
    </div>
  )
}
const ErrorModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop 
          onConfirm={props.onConfirm}
        />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById('overlay-root')
      )}
    </React.Fragment>
  );
};
export default ErrorModal;
