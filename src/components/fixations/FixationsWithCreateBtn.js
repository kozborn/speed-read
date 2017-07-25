import React from "react";
import {instanceOf, func} from "prop-types";
import {Map} from "immutable";
import Fixations from "./Fixations";
import Modal from "../common/Modal";
import TextForm from "../forms/TextForm";

export default class FixationsWithCreateButton extends React.Component {

  static propTypes = {
    fixation: instanceOf(Map).isRequired,
    saveText: func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalOpen: true});
  }

  closeModal() {
    this.setState({modalOpen: false});
  }

  render() {
    return (<div>
      <Fixations {...this.props} createBtnCb={this.openModal} />
      <Modal
        isOpen={this.state.modalOpen}
        closeModal={this.closeModal}
      >
        <TextForm
          title={this.props.fixation.get("title")}
          text={this.props.fixation.get("text")}
          saveText={this.props.saveText}
        />
      </Modal>
    </div>);
  }
}
