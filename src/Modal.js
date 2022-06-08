import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./styles/modal.scss";

const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div className="active">{children}</div>, elRef.current);
};

export default Modal;
