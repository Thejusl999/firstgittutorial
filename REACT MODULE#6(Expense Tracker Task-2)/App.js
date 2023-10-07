import React,{useContext} from 'react';
import {Route,Switch,useHistory,Redirect} from 'react-router-dom';
import AuthForm from './components/Auth/AuthForm';
import StartingPage from './pages/StartingPage';
import AuthContext from './store/auth-context';

function App() {
  const authCtx=useContext(AuthContext);
  const history=useHistory();
  if(localStorage.length!==0){
    Object.entries(localStorage).forEach((key)=>{
      authCtx.login(key[1])
    })
    history.push('/startPage');
  }
  return (
    <>
      <Switch>
        <Route path='/' exact>
          <AuthForm/>
        </Route>
        <Route path='/startPage'>
          {authCtx.isLoggedIn?<StartingPage/>:<Redirect to='/'/>}
        </Route>
      </Switch>
    </>
  );
}

export default App;
