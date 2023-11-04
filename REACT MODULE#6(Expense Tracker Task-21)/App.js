import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect, useRef, useState } from 'react';
import Notification from './components/UI/Notification';
import { cartItemsActions, fetchCartData, sendCartData } from './store/cartItems';

let initial=true;
let first=true;
function App() {
  const cartContents=useSelector(state=>state.cartItems.cartItemsArr);
  const notification=useSelector(state=>state.notifications);
  const [loading,setIsLoading]=useState(false);
  const dispatch=useDispatch();
  let finalCart=[];
  useEffect(()=>{
    setIsLoading(true)
    cartContents.map(item=>{
      if(item.quantity!==0){
        finalCart.push(item);
      }
    })
    if(initial){
      first=false;
      initial=false;
      async function execute(){
        await dispatch(fetchCartData());
        setTimeout(()=>setIsLoading(false),2000);
        first=true;
      }
      execute();
      return;
    }
    async function execute1(){
      first=false;
      await dispatch(sendCartData(finalCart));
      setTimeout(()=>setIsLoading(false),2000)
    }
    execute1();
  },[cartContents])

  return (
    <>
      {(loading&&notification.fetchNotification.title!=='')&&<Notification title={notification.fetchNotification.title} message={notification.fetchNotification.message} status={notification.fetchNotification.status}/>}
      {(loading&&!first&&notification.sendNotification.title!=='')&&<Notification title={notification.sendNotification.title} message={notification.sendNotification.message} status={notification.sendNotification.status}/>}
      <Layout>
        <Cart />
        <Products />
      </Layout>
    </>
  );
}

export default App;
