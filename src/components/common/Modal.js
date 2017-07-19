import React from "react";
import Modal from "react-modal";
import {bool, string, func} from "prop-types";

export default class extends React.Component {

  static propTypes = {
    isOpen: bool.isRequired,
    contentLabel: string,
    onClose: func,
    closeBtn: bool,
  }

  static defaultProps = {
    contentLabel: "",
    onClose: () => null,
    closeBtn: true,
  }

  render() {
    const {isOpen, contentLabel, closeBtn, onClose} = this.props;

    return (
      <Modal
        isOpen={isOpen}
        aria={{
          labelledby: "heading",
          describedby: "full_description",
        }}
        contentLabel={contentLabel}
      >
        {closeBtn ? <button className="modal__close-btn" onClick={onClose} >X</button> : null}
        {this.props.children}
      </Modal>
    );
  }
}
