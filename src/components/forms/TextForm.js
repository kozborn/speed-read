import React, {Component} from "react";
import {func, string} from "prop-types";
import ContentEditable from "react-contenteditable";
import { sanitizeString } from "../../utils/helpers";

export default class TextForm extends Component {

  static propTypes = {
    id: string,
    title: string,
    text: string,
    saveText: func.isRequired,
  }

  static defaultProps = {
    id: null,
    title: "Title",
    text: "Dodaj swój text",
  }

  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      text: this.props.text,
    };
    this.changeTitle = this.changeTitle.bind(this);
    this.changeText = this.changeText.bind(this);
    this.saveText = this.saveText.bind(this);
    this.textareaRef = this.textareaRef.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({text: nextProps.text, title: nextProps.title});
  }

  changeTitle(e) {
    this.setState({title: e.target.value});
  }

  changeText(evt) {
    this.setState({text: sanitizeString(evt.target.value)});
  }

  saveText() {
    const {title, text} = this.state;
    const data = {
      id: this.props.id,
      title,
      text,
    };
    this.props.saveText(data);
  }

  textareaRef(e) {
    this.textarea = e;
  }

  render() {
    return (
      <div className="text-form">
        <div className="form-row">
          <input
            type="text"
            className="form-control"
            value={this.state.title}
            onChange={this.changeTitle}
          />
        </div>
        <div className="form-row">
          <ContentEditable
            className="form-control"
            html={this.state.text}
            onChange={this.changeText}
          />
        </div>
        <div className="form-row">
          <button className="btn btn-sm btn-default" onClick={this.saveText}>
            Zapisz
          </button>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}
