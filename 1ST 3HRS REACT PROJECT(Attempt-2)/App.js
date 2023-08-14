import React, { useState } from "react";
import ProductsList from "./components/Products/ProductsList";
import ProductDetails from "./components/Products/ProductDetails";
import "./App.css";
var total=0;
const App = () => {
  const [products, setProducts] = useState([]);
  const addProductHandler = (id, price, product) => {
    localStorage.setItem(id,JSON.stringify({expenseamount: price,description:product,orderId:id}));
    setProducts((prevProducts) => {
      return [
        ...prevProducts,
        { productId: id, price: price, product:product, id: Math.random().toString()},
      ];
    });
    total+=Number(price);
  };

  const cancelProductHandler=(id,price)=>{
    localStorage.removeItem(id);
    total-=Number(price);
  }
  const onDeleteHandler=(index)=>{
    const updatedProducts=[...products];
    updatedProducts.splice(index,1);
    setProducts(updatedProducts);
  }

  return (
    <React.Fragment>
      <ProductDetails onAddProduct={addProductHandler} />
      <h2>Products</h2>
      <ProductsList items={products} onCancelProduct={cancelProductHandler} onDelete={onDeleteHandler}/>
      <h2>Total Value Worth of Products: ₹{total}</h2>
    </React.Fragment>
  );
};
export default App;
