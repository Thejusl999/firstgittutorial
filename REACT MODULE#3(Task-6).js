// REACT MODULE#3 - TASK-6: Refs and Controlled Components
// Using useRefs to read and clear input fields instead of using useState

// NewUser.js code: (useRef for collegeName added)
import React, { useState, useRef } from "react";
import ErrorModal from "../UI/ErrorModal";
import Card from "../UI/Card";
import Wrapper from "../Helpers/Wrapper";
import './NewUser.css';
const NewUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const collegeNameInputRef = useRef();

  /* const [nameInput, setNameInput] = useState("");
  const [ageInput, setAgeInput] = useState("");
  const nameChangeHandler = (e) => {
    setNameInput(e.target.value);
  };
  const ageChangeHandler = (e) => {
    setAgeInput(e.target.value);
  }; */
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredName=nameInputRef.current.value;
    const enteredAge=ageInputRef.current.value;
    const enteredCollegeName=collegeNameInputRef.current.value;
    // if(nameInput.length===0||ageInput.length===0){
    if(enteredName.length===0||enteredAge===0||enteredCollegeName.length===0){
      setError({
        title: 'Invalid input',
        message: "Please enter a valid names and age (non-empty values)."
      })
      return;
    }
    // if(ageInput.length<1){
    if(enteredAge<1){
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (>0).'
      })
      return;
    }
    /* props.onAddUser(nameInput,ageInput);
    setNameInput("");
    setAgeInput(""); */
    props.onAddUser(enteredName,enteredAge,enteredCollegeName);
    nameInputRef.current.value="";
    ageInputRef.current.value="";
    collegeNameInputRef.current.value="";
  };
  const [error, setError]=useState();
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
              /* value={nameInput}
              onChange={nameChangeHandler} */
              ref={nameInputRef}
            />
          </div>
          <div className="form-controls">
            <label>Age (Years)</label>
            <input
              className="form-inputs"
              type="number"
              /* value={ageInput}
              onChange={ageChangeHandler} */
              ref={ageInputRef}
            />
          </div>
          <div className="form-controls">
            <label>College Name</label>
            <input
              className="form-inputs"
              type="text"
              ref={collegeNameInputRef}
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

// UsersList.js code: (collegeName property added to li to show it in the list)
import React from "react";
import './UsersList.css';
import Card from "../UI/Card";
const UsersList = (props) => {
  return (
    <Card>
      <ul className='user-ul'>
        {props.items.map((item=>(
          <li className='user-li' key={item.id}>
            {item.name} ({item.age} years old from {item.collegeName} College)
          </li>
        )))}
      </ul>
    </Card>
  );
};
export default UsersList;

// App.js code: (lifted up the state(collegeName value) from NewUser component to the App component)
import React, { useState } from "react";
import UsersList from "./components/Users/UsersList";
import NewUser from "./components/Users/NewUser";
import "./App.css";
const App = () => {
  const [users, setUsers] = useState([]);
  const addUserHandler = (userName, userAge, userCollege) => {
    setUsers((prevUsers) => {
      return [
        ...prevUsers,
        { name: userName, age: userAge, id: Math.random().toString(), collegeName: userCollege},
      ];
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