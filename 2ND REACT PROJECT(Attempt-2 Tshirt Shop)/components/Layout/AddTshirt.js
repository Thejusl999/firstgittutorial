import React, { useContext, useRef } from "react";
import './AddTshirt.css';
import CartContext from "../../store/input-context";
const  AddCandy = () => {
  const nameInput=useRef();
  const descriptionInput=useRef();
  const priceInput=useRef();
  const largeQ=useRef();
  const mediumQ=useRef();
  const smallQ=useRef();
  const cartCtx=useContext(CartContext);
  const submitHandler=(e)=>{
    e.preventDefault();
    const name=nameInput.current.value;
    const description=descriptionInput.current.value;
    const price=priceInput.current.value;
    const large=largeQ.current.value;
    const medium=mediumQ.current.value;
    const small=smallQ.current.value;
    const candy=[{
      name:name,
      description:description,
      price:price,
      Lquantity:large,
      Mquantity:medium,
      Squantity:small
    }]
    cartCtx.addItem(candy);
    nameInput.current.value='';
    descriptionInput.current.value='';
    priceInput.current.value='';
    largeQ.current.value='';
    mediumQ.current.value='';
    smallQ.current.value='';
  }
  return(
    <div>
        <form className='form'>
        <h2>ADD T-SHIRT DETAILS</h2>
        <div>
            <label className='labels'>T-SHIRT NAME:</label>
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
        <div>
            <label className='labels'>QUANTITY AVAILABLE:</label>
              <label className='labels'>L</label><input className='quantityInputs' type="number" ref={largeQ}/>
              <label className='labels'>M</label><input className='quantityInputs' type="number" ref={mediumQ}/>
              <label className='labels'>S</label><input className='quantityInputs' type="number" ref={smallQ}/>
        </div>
        <input className='button' onClick={submitHandler} type='submit' value="ADD PRODUCT"/>
        </form>
    </div>
  );
};
export default AddCandy;
