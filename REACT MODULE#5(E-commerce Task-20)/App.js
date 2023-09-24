import React,{useContext} from 'react';
import { Switch,Route,Redirect,useHistory } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';

function App() {
  const authCtx=useContext(AuthContext);
  const history=useHistory();
  if(localStorage.length!==0){
    Object.entries(localStorage).forEach((key)=>{
      authCtx.login(key[1])
    })
    history.push('/profile');
  }
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        <Route path='/profile'>
        {authCtx.isLoggedIn?<UserProfile />:<Redirect to='/'/>}
        </Route>
        <Route path='*'>
          <Redirect to='/'/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
