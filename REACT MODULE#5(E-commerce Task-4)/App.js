import React from 'react';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
const router=createBrowserRouter([
  {path:'home',element:<Home/>},
  {path:'',element:<Products/>},
  {path:'/about',element:<About/>}
])
const App = () => {
  return <RouterProvider router={router}/>
};
export default App;