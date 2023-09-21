import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetails from './components/Products/ProductDetails';
import CartProvider from './store/CartProvider';
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
    <CartProvider>
      <Switch><main>
        <Route path='/home'>
          <Home/>
        </Route>
        <Route path='/products' exact>
          <Products/>
        </Route>
        <Route path='/about'>
          <About/>
        </Route>
        <Route path='/contact'>
          <Contact onAddUser={newUserHandler}/>
        </Route>
        <Route path='/products/:productID'>
          <ProductDetails/>
        </Route>
      </main></Switch>
    </CartProvider>
  )
};
export default App;