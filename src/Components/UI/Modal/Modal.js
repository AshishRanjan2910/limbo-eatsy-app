import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClickOnModal} />;
};

const ModalOverlay = (props) => {
  // style={{ position: 'fixed', bottom }}
  const [bottom, setBottom] = useState('0');

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      const keyboardHeight = height * 0.4; // adjust this value to your needs
      const newBottom = keyboardHeight > 0 ? `${keyboardHeight}px` : '0';
      setBottom(newBottom);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={classes.modal}>
      <div className={classes.content} style={{ bottom }}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClickOnModal={props.onClickOnModal} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
