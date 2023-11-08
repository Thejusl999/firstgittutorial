import React,{useEffect} from 'react';
import AuthPage from './pages/AuthPage';
import { Switch,Route,Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import HomePage from './pages/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { userDataActions } from './store/userData';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

function App() {
  const history=useHistory();
  const dispatch=useDispatch();
  const data=useSelector(state=>state.userData)
  
  useEffect(()=>{
    if(localStorage.length>0){
      console.log(data)
      Object.entries(localStorage).forEach(data=>{
        dispatch(userDataActions.setIsLoggedIn());
        dispatch(userDataActions.setEmail(data[0].replace(/[@.]/g,'')));
        dispatch(userDataActions.setToken(data[1]));
      })
      history.push('/home');
    }else{
      history.push('/');
    }
  },[]);
  
  return (
    <Switch>
      <Route path='/' exact>
        <AuthPage/>
      </Route>
      <Route path='/home'>
        <HomePage/>
      </Route>
      <Redirect to='/'/>
    </Switch>
  );
}

export default App;