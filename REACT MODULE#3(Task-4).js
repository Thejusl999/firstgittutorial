// ADVANCE REACT MODULE#3 - TASK-4:TIME TO MAKE YOUR FIRST PROJECT
// To create a user registration app and show registered users on screen

// (1) Main Component =>
// App.js code =>
import React, { useState } from "react";
import UsersList from "./components/Users/UsersList";
import NewUser from "./components/Users/NewUser";
import "./App.css";
const App = () => {
  const [users, setUsers] = useState([]);
  const addUserHandler = (userName, userAge) => {
    setUsers((prevUsers) => {
      return [
        ...prevUsers,
        { name: userName, age: userAge, id: Math.random().toString() },
      ];
    });
  };

  return (
    <div>
      <NewUser onAddUser={addUserHandler} />
      <UsersList items={users} />
    </div>
  );
};
export default App;

// (2) 'Users' Folder components =>
// NewUser.js code:
import React, { useState } from "react";
import ErrorModal from "../UI/ErrorModal";
import Card from "../UI/Card";
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
    <div>
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
    </div>
  );
};
export default NewUser;

// UsersList.js code:
import React from "react";
import './UsersList.css';
import Card from "../UI/Card";
const UsersList = (props) => {
  return (
    <Card>
      <ul className='user-ul'>
        {props.items.map((item=>(
          <li className='user-li' key={item.id}>
            {item.name} ({item.age} years old)
          </li>
        )))}
      </ul>
    </Card>
  );
};
export default UsersList;

// (3) 'UI' Folder components =>
// Card.js code:
import React from 'react';
import './Card.css'
const Card=props=>{
    return <div className='card'>{props.children}</div>;
}
export default Card;

// ErrorModal.js code:
import React from "react";
import classes from './ErrorModal.module.css'
import '../Users/NewUser.css';
const ErrorModal = (props) => {
  return (
    <div>
        <div className={classes.backdrop} onClick={props.onConfirm}></div>
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
    </div>
  );
};
export default ErrorModal;