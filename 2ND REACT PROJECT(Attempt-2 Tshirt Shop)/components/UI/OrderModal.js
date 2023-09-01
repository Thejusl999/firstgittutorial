import React from "react";
import ReactDOM from "react-dom";
import CartItemsList from "../Cart/CartItemsList";
import classes from "./OrderModal.module.css";
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};
const ModalOverlay = (props) => {
  return <CartItemsList onCloseClick={props.onClick}/>
};
const OrderModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClick={props.onClose} />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};
export default OrderModal;