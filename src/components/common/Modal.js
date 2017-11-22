import React from "react";
import ReactDOM from 'react-dom';
import cn from 'classnames';
import { bool, node, string, func, oneOf } from "prop-types";

const ModalContent = ({
  isOpen,
  closeBtn,
  onClose,
  children,
  title,
  overlay,
  position,
  container,
}) => {
  return (
    isOpen ? ReactDOM.createPortal(
      <div className="modal">
        <div className={cn('modal-container', {"modal__overlay": overlay})}>
          <div className={cn("modal__content", position)}>
            {closeBtn && <button onClick={onClose} className="modal--close" />}
            <h3>{title}</h3>
            {children}
          </div>
        </div>
      </div>, container || document.getElementById("root"))
    : null
  );
};

ModalContent.propTypes = {
  isOpen: bool.isRequired,
  closeBtn: bool.isRequired,
  onClose: func.isRequired,
  children: node.isRequired,
  container: node,
  title: string,
  overlay: bool,
  position: oneOf(["center", "left", "right"]).isRequired,
};

ModalContent.defaultProps = {
  title: "",
  overlay: true,
  container: null,
};

export default ModalContent;
