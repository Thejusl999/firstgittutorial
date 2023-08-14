import React from "react";
import './ProductsList.css';
const ProductsList = (props) => {
  const deleteHandler=(id,price,index)=>{
    props.onCancelProduct(id,price);
    props.onDelete(index);
  }

  return (
    <div>
      <ul>
        {props.items.map((item,index)=>(
          <li key={index}>
            {item.price}-{item.product}
            <button onClick={()=>deleteHandler(item.productId,item.price,index)}>Delete Product</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ProductsList;