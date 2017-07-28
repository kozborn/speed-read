import React from "react";
import {func, string, instanceOf} from "prop-types";
import {Map} from "immutable";
import _ from "underscore";
import Modal from "../common/Modal";
import TextForm from "../forms/TextForm";
import {getTextsFromDocument, getNextId} from "../../utils/helpers";
import TextsList from "./TextsList";

export default class extends React.Component {

  static propTypes = {
    getDoc: func.isRequired,
    docId: string.isRequired,
    saveText: func.isRequired,
    document: instanceOf(Map).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      textToEdit: new Map(),
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.saveText = this.saveText.bind(this);
    this.setTextToEdit = this.setTextToEdit.bind(this);
  }

  componentWillMount() {
    this.props.getDoc(this.props.docId);
  }

  setTextToEdit(id) {
    this.setState({textToEdit: this.props.document.get(id)});
    this.openModal();
  }

  saveText(data) {
    const key = data.id ? data.id : getNextId(this.props.document);
    this.props.saveText(this.props.docId, key, _.extend(data, {id: key}));
    this.closeModal();
  }

  openModal() {
    this.setState({modalOpen: true});
  }

  closeModal() {
    this.setState({modalOpen: false});
  }

  render() {
    return (
      <div className="user-texts">
        {this.props.docId ?
          <div>
            <div>Twoje teksty</div>
            <TextsList
              texts={getTextsFromDocument(this.props.document)}
              setTextToEdit={this.setTextToEdit}
            />
          </div>
        :
          <div>Nie masz jeszcze swojego documentu</div>
        }

        <button className="btn btn-sm btn-primary" onClick={this.openModal}>Dodaj nowy text</button>

        <Modal
          isOpen={this.state.modalOpen}
          closeModal={this.closeModal}
        >
          <TextForm
            id={this.state.textToEdit.get("id")}
            title={this.state.textToEdit.get("title")}
            text={this.state.textToEdit.get("text")}
            saveText={this.saveText}
          />
        </Modal>
      </div>
    );
  }

}

