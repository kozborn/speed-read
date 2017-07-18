import React from "react";
import Fixations from "./Fixations";
import Modal from "./common/Modal";

export default class FixationsWithCreateButton extends React.Component {

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
      <Fixations {...this.props} />
      <button onClick={this.openModal}>Add your fixations text</button>
      <Modal
        isOpen={this.state.modalOpen}
        onClose={this.closeModal}
      >
        Dupa jasia
      </Modal>
    </div>);
  }
}
