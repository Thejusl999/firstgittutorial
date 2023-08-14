import React, {useRef} from "react";
import AddProductInput from "./AddProductInput";
import Card from "../UI/Card";
import './ProductDetails.css';
const ProductDetails = (props) => {
  const idInputRef = useRef();
  const priceInputRef = useRef();
  const productInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredId=idInputRef.current.value;
    const enteredPrice=priceInputRef.current.value;
    const enteredProduct=productInputRef.current.value;
    if(enteredId.length===0||enteredPrice===0||enteredProduct.length===0){
      alert("Enter all fields!")
      return;
    }
    props.onAddProduct(enteredId,enteredPrice,enteredProduct); 
    idInputRef.current.value="";
    priceInputRef.current.value="";
    productInputRef.current.value="";
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <AddProductInput label='Product ID:' type='number' ref={idInputRef}/>
        <AddProductInput label='Selling Price:' type='number' ref={priceInputRef}/>
        <AddProductInput label='Product Name:' type='text' ref={productInputRef}/>
        <button className="form-actions" type="submit">Add Product</button>
      </form>
    </Card>
  );
};
export default ProductDetails;