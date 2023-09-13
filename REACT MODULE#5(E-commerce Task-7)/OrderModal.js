import React from "react";
import ReactDOM from "react-dom";
import classes from './OrderModal.module.css';
const ModalOverlay = () => {
  return (
    <div className={classes.modal}> Loading... Please wait!</div>
  )
};
const OrderModal = () => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay/>,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};
export default OrderModal;