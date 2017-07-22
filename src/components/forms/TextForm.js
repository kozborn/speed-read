import React, {Component} from "react";
import {func, string} from "prop-types";

export default class TextForm extends Component {

  static propTypes = {
    text: string,
    saveText: func.isRequired,
  }

  static defaultProps = {
    text: "Dodaj swój text",
  }

  constructor(props) {
    super(props);
    this.state = {
      savedDocument: "",
      text: this.props.text,
    };
    this.textAreaRef = this.textAreaRef.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveText = this.saveText.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({text: nextProps.text});
  }

  textAreaRef(e) {
    this.textarea = e;
  }

  handleChange() {
    this.setState({text: this.textarea.value});
  }

  saveText() {
    this.props.saveText(this.textarea.innerHTML);
  }

  render() {
    const {savedDocument} = this.state;
    const currentPath = window.location.pathname;
    return (
      <div className="user-text-form">

        {savedDocument ? <h3>Your private url: {`${currentPath}?documentId=${savedDocument.id}`}</h3> : null}
        <div
          ref={this.textAreaRef}
          contentEditable="true"
          suppressContentEditableWarning="true"
          className="form-control text-form"
          onChange={this.handleChange}
        >
          {this.state.text}
        </div>
        <button className="save" onClick={this.saveText}>
          Zapisz
        </button>
        <div className="clearfix" />
      </div>
    );
  }
}
