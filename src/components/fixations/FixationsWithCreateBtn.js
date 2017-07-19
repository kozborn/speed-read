import React from "react";
import {string, func} from "prop-types";
import Fixations from "./Fixations";
import Modal from "../common/Modal";
import TextForm from "../forms/TextForm";

export default class FixationsWithCreateButton extends React.Component {

  static propTypes = {
    fixationText: string.isRequired,
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
      <button onClick={this.openModal}>Add your fixations text</button>
      <Fixations {...this.props} />
      <Modal
        isOpen={this.state.modalOpen}
        onClose={this.closeModal}
      >
        <TextForm
          text={this.props.fixationText}
          saveText={this.props.saveText}
        />
      </Modal>
    </div>);
  }
}
