import React,{useContext,useEffect} from 'react';
import {Route,Switch,useHistory,Redirect} from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import ProductDetails from './components/Products/ProductDetails';
import AuthContext from './store/auth-context';
import CartContext from './store/cart-context';

const App = () => {
  const authCtx=useContext(AuthContext);
  const cartCtx=useContext(CartContext);
  const history=useHistory();
  useEffect(()=>cartCtx.cartUpdater(),[])
  if(localStorage.length!==0){
    Object.entries(localStorage).forEach((key)=>{
      authCtx.login(key[1])
    })
    history.push('/products');
  }
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
      <Switch>
        <Route path='/' exact>
          <Login/>
        </Route>
        <Route path='/home'>
          <Home/>
        </Route>
        <Route path='/products' exact>
          {authCtx.isLoggedIn?<Products/>:<Redirect to='/'/>}
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
        <Route path='*'>
          <Redirect to='/'/>
        </Route>
      </Switch>
    </>
  )
};
export default App;