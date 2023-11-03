import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect, useState } from 'react';
import Notification from './components/UI/Notification';
import { notificationActions } from './store/notifications';

function App() {
  const cartContents=useSelector(state=>state.cartItems.cartItemsArr);
  const notificationStatus=useSelector(state=>state.notifications);
  const [loading,setIsLoading]=useState(false);
  const dispatch=useDispatch();
  let finalCart=[];
  useEffect(()=>{
    cartContents.map(item=>{
      if(item.quantity!==0){
        finalCart.push(item);
      }
    })
    if(cartContents.length>0){
      setIsLoading(true);
      dispatch(notificationActions.setSending());
      fetch('https://async-redux-app-default-rtdb.firebaseio.com/cartList.json',{
        method:'PUT',
        body:JSON.stringify(finalCart),
        headers:{
          'Content-Type':'application.json'
        }
      })
      .then(response=>{
        if(!response.ok){
          dispatch(notificationActions.setError());        
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data=>{
        setTimeout(()=>dispatch(notificationActions.setSuccess()),500);
        setTimeout(()=>setIsLoading(false),2000);
      })
      .catch(err=>console.log(err));
    }
  },[cartContents]);

  return (
    <>
      {loading&&<Notification title={notificationStatus.title} message={notificationStatus.message} status={notificationStatus.status}/>}
      <Layout>
        <Cart />
        <Products />
      </Layout>
    </>
  );
}

export default App;
