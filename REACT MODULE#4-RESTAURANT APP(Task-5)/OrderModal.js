import React from 'react';
import ReactDOM from 'react-dom';
import classes from './OrderModal.module.css';
const Backdrop=props=>{
    return <div className={classes.backdrop}></div>
}
const ModalOverlay=props=>{
    return (
        <div className={classes.modal}>
            <h4 className={classes.header}>Sushi</h4>
            <div >
                <h3 className={classes.text}>Total Amount</h3>
                <h3 className={classes.price}>35.62</h3>
            </div>
            <div className={classes['button-div']}>
                <button className={classes.closeButton}>Close</button>
                <button className={classes.orderButton}>Order</button>
            </div>
        </div>
    )
}
const OrderModal=props=>{
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop/>,
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(
                <ModalOverlay/>,
                document.getElementById('overlay-root')
            )}
        </React.Fragment>
    )
}
export default OrderModal;