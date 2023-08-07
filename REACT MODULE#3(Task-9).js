// REACT MODULE#3 - TASK-9: Context API
// Using Context API to move data instead of using props

/* There are two ways to use the context data:
i)  Using the Consumer property on the Wrapper object
ii) Using the useContext hook */

// TASK: Converting the props on login and logout to useContext api

// auth-context.js code: (creating an object that behaves as a component to use it as a wrapper)
import React from 'react';
const AuthContext=React.createContext({
    isLoggedIn:false
});
export default AuthContext;

// App.js code: (Wrapping the JSX code using context object with the 'Provider' property & defining the values of login and logout dynamically)
import React, { useState, useEffect } from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    const storedUserInfo = localStorage.getItem('isLoggedIn');
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
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      onLogout: logoutHandler
    }}>
      <MainHeader/>
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}
export default App;

// Navigation.js code: (2 alternatives i.e using the context object with 'Consumer' property & using the useContext hook; *props removed*)
import React, {useContext} from 'react';
import AuthContext from '../../store/auth-context';
import classes from './Navigation.module.css';
const Navigation = () => {
  const ctx=useContext(AuthContext);      //ii) using the useContext hook
  return (
    // <AuthContext.Consumer>             //i) using the context wrapper with 'Consumer' property
    //   {(ctx)=>{
    //     return (
          <nav className={classes.nav}>
            <ul>
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Users</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <button onClick={ctx.onLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
    //     )
    //   }}
    // </AuthContext.Consumer>
  );
};
export default Navigation;

// MainHeader.js code: (props removed as Navigation.js component uses useContext that takes data directly from AuthContext)
import React from 'react';
import Navigation from './Navigation';
import classes from './MainHeader.module.css';
const MainHeader = () => {
  return (
    <header className={classes['main-header']}>
      <h1>A Typical Page</h1>
      <Navigation/>
    </header>
  );
};
export default MainHeader;