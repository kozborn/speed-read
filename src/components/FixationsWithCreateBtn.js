import React from "react";
import {string, func} from "prop-types";
import Fixations from "./Fixations";
import Modal from "./common/Modal";
import TextForm from "./forms/TextForm";

export default class FixationsWithCreateButton extends React.Component {

  static propTypes = {
    fixationText: string.isRequired,
    save: func.isRequired,
    getDoc: func.isRequired,
    docId: string,
  }

  static defaultProps = {
    docId: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.saveText = this.saveText.bind(this);
  }

  componentWillMount() {
    this.props.getDoc(this.props.docId);
  }

  openModal() {
    this.setState({modalOpen: true});
  }

  closeModal() {
    this.setState({modalOpen: false});
  }

  saveText(text) {
    this.props.save("fixations", text);
  }

  render() {
    return (<div>
      <Fixations {...this.props} />
      <button onClick={this.openModal}>Add your fixations text</button>
      <Modal
        isOpen={this.state.modalOpen}
        onClose={this.closeModal}
      >
        <TextForm
          text={this.props.fixationText}
          saveText={this.saveText}
        />
      </Modal>
    </div>);
  }
}
