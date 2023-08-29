import React ,{useState} from 'react';
import OrderModal from './components/UI/OrderModal';
import AvailableCandies from './components/Meals/AvailableCandies';
import AddCandy from './components/Layout/AddCandy';
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
      <AddCandy/>
      <AvailableCandies/>
      </CartProvider>
    </InputProvider>
  );
}
export default App;