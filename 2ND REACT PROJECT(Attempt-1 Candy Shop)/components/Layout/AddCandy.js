import React, { useContext, useRef } from "react";
import './AddCandy.css';
import CartContext from "../../store/input-context";
const  AddCandy = () => {
  const nameInput=useRef();
  const descriptionInput=useRef();
  const priceInput=useRef();
  const cartCtx=useContext(CartContext);
  const submitHandler=(e)=>{
    e.preventDefault();
    const name=nameInput.current.value;
    const description=descriptionInput.current.value;
    const price=priceInput.current.value;
    const candy=[{
      name:name,
      description:description,
      price:price,
    }]
    cartCtx.addItem(candy);
    nameInput.current.value='';
    descriptionInput.current.value='';
    priceInput.current.value='';
  }
  return(
    <div>
        <form className='form'>
        <h2>ADD CANDY DETAILS</h2>
        <div>
            <label className='labels'>CANDY NAME:</label>
            <input className='inputs' type="text" id="name" ref={nameInput}/>
        </div>
        <div>
            <label className='labels'>DESCRIPTION:</label>
            <input className='inputs' type="text" id="description" ref={descriptionInput}/>
        </div>
        <div>
            <label className='labels'>PRICE:</label>
            <input className='inputs' type="number" id="price" ref={priceInput}/>
        </div>
        <input className='button' onClick={submitHandler} type='submit' value="ADD CANDY"/>
        </form>
    </div>
  );
};
export default AddCandy;
