import React,{useContext,useEffect} from 'react';
import {Route,Switch,useHistory,Redirect,useLocation} from 'react-router-dom';
import AuthForm from './components/Auth/AuthForm';
import StartingPage from './pages/StartingPage';
import ProfilePage from './pages/ProfilePage';
// import AuthContext from './store/auth-context';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './redux-store/auth';

function App() {
    // const authCtx=useContext(AuthContext);
  const loggedInStatus=useSelector(state=>state.auth.isAuthenticated);
  const expensesArr=useSelector(state=>state.expenses.expensesArray)
  const dispatch=useDispatch();
  console.log(expensesArr)
  const history=useHistory();
  const location=useLocation();
  useEffect(()=>{
    if(localStorage.length!==0&&location.pathname!=='/profile'){
      Object.entries(localStorage).forEach((key)=>{
        // authCtx.login(key[1]);
        dispatch(authActions.login(key[1]));
      })
      history.push('/startPage');
    }else if(localStorage.length!==0&&location.pathname==='/profile'){
      Object.entries(localStorage).forEach((key)=>{
        // authCtx.login(key[1]);
        dispatch(authActions.login(key[1]));
      })
      history.push('/profile');
    }
  },[])
  return (
    <>
      <Switch>
        <Route path='/' exact>
          <AuthForm/>
        </Route>
        <Route path='/resetPassword'>
          <ResetPasswordPage/>
        </Route>
        <Route path='/startPage'>
          {/* {authCtx.isLoggedIn?<StartingPage/>:<Redirect to='/'/>} */}
          {loggedInStatus?<StartingPage/>:<Redirect to='/'/>}
        </Route>
        <Route path='/profile'>
          {/* {authCtx.isLoggedIn?<ProfilePage/>:<Redirect to='/'/>} */}
          {loggedInStatus?<ProfilePage/>:<Redirect to='/'/>}
        </Route>
        <Redirect to='/'/>
      </Switch>
    </>
  );
}

export default App;
