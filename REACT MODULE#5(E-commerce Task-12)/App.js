import React from 'react';
import {Route} from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
const App = () => {
  async function newUserHandler(newUser){
    await fetch('https://react-http-a5c75-default-rtdb.firebaseio.com/users.json',{
      method:'POST',
      body:JSON.stringify(newUser),
      headers:{
        'Content-Type':'application/json'
      }
    })
  }
  return (
    <>
      <main>
        <Route path='/home'>
          <Home/>
        </Route>
        <Route path='/products'>
          <Products/>
        </Route>
        <Route path='/about'>
          <About/>
        </Route>
        <Route path='/contact'>
          <Contact onAddUser={newUserHandler}/>
        </Route>
      </main>
    </>
  )
};
export default App;