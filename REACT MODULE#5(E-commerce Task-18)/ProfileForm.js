import React,{useContext, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const newPasswordRef=useRef();
  const authCtx=useContext(AuthContext);
  const history=useHistory();
  async function changePasswordHandler(e){
    e.preventDefault();
    const newPassword=newPasswordRef.current.value;
    const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAjrVEwwfFJ1ESLh8hh7JY0pHnojJnymZU',{
      method:'POST',
      body:JSON.stringify({
        idToken:authCtx.token,
        password:newPassword,
        returnSecureToken:true
      }),
      headers:{
        'Content-Type':'application/json'
      }
    })
    if(response.ok){
      authCtx.logout();
      alert('Password Changed Successfully');
      history.push('/auth');
    }else{
      const errorMsg='Password Change Unsuccessful';
      alert(errorMsg);
    }
  }
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef}/>
      </div>
      <div className={classes.action}>
        <button onClick={changePasswordHandler}>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
