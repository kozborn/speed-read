import React from "react";
import _ from "underscore";
import Modal from "react-modal";
import {bool, object, string, func} from "prop-types";

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
  },
  content: {
    position: "relative",
    top: null,
    left: null,
    right: null,
    bottom: null,
    border: "1px solid #ccc",
    background: "#fff",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px 10px 10px", // 20px on top because of close button
    margin: "10px auto",
    maxWidth: "800px",
    overflow: "auto",
  },
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
    const {isOpen, contentLabel, closeBtn, closeModal} = this.props;
    return (
      <Modal
        isOpen={isOpen}
        aria={{
          labelledby: "heading",
          describedby: "full_description",
        }}
        style={_.extend({}, styles, this.props.style)}
        contentLabel={contentLabel}
      >
        {closeBtn ? <button className="modal__close-btn" onClick={closeModal} >&times;</button> : null}
        <div className="modal__content">
          {this.props.children}
        </div>
      </Modal>
    );
  }
}
