import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import classes from './OrderModal.module.css';
import CartContext from '../../store/cart-context';
const Backdrop=props=>{
    return <div className={classes.backdrop} onClick={props.onClick}></div>
}
const ModalOverlay=props=>{
    const cartCtx=useContext(CartContext);
    let total=0;
    const addedItem=(<ul>{cartCtx.items.map((item)=>(
        <li key={Math.random()}>{item[item.length-1].name}-({item[item.length-1].quantity}nos)</li>))}</ul>
    );
    cartCtx.items.forEach((item)=>{
        total+=Number(item[item.length-1].price.substring(1))*Number(item[item.length-1].quantity)
    })
    return (
        <div className={classes.modal}>
            <h4 className={classes.header}>{addedItem}</h4>
            <hr></hr>
            <div>
                <h3 className={classes.text}>Total Amount</h3>
                <h3 className={classes.price}>${total.toFixed(2)}</h3>
            </div>
            <div className={classes['button-div']}>
                <button className={classes.closeButton} onClick={props.onClick}>Close</button>
                <button className={classes.orderButton}>Order</button>
            </div>
        </div>
    )
}
const OrderModal=props=>{
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop onClick={props.onClose}/>,
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(
                <ModalOverlay onClick={props.onClose}/>,
                document.getElementById('overlay-root')
            )}
        </React.Fragment>
    )
}
export default OrderModal;