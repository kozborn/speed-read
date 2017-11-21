import React from "react";
import ReactDOM from 'react-dom';
import cn from 'classnames';
import {bool, object, string, func} from "prop-types";

const ModalContent = ({
  closeBtn,
  onClose,
  children,
  title,
  overlay,
  position,
}) => {
  return (
    <div className="modal">
      <div className={cn({"modal__overlay": overlay})}>
        <div className={cn("modal__content", position)}>
          <h3>{title}</h3>
          {children}
        </div>
      </div>
    </div>
  );
};

export default class extends React.Component {

  static propTypes = {
    isOpen: bool.isRequired,
    contentLabel: string,
    closeModal: func.isRequired,
    closeBtn: bool,
    style: object,
  }

  static defaultProps = {
    contentLabel: "",
    closeBtn: true,
    style: {},
  }

  render() {
    const { isOpen, children, container, overlay, title, position } = this.props;

    return (
      isOpen ? ReactDOM.createPortal(<ModalContent
          overlay={overlay}
          title={title}
          position={position}
        >
        {children}
      </ModalContent>, container) : null
    );
  }
}
