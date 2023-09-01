import React ,{useState} from 'react';
import OrderModal from './components/UI/OrderModal';
import TshirtList from './components/Meals/TshirtList';
import AddTshirt from './components/Layout/AddTshirt';
import Header from './components/Layout/Header'; 
import InputProvider from './store/InputProvider';
import CartProvider from './store/CartProvider';
function App() {
  const [cartIsShown,setCartIsShown]=useState(false);
  const showCartHandler=()=>{setCartIsShown(true)};
  const hideCartHandler=()=>{setCartIsShown(false)};
  return (
    <InputProvider>
      <CartProvider>
      {cartIsShown&&<OrderModal onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <AddTshirt/>
      <TshirtList/>
      </CartProvider>
    </InputProvider>
  );
}
export default App;