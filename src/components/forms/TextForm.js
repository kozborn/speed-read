import React, {Component} from "react";
import Immutable from 'immutable';
import { func, string, instanceOf} from "prop-types";
import { guid } from "../../utils/helpers";
import DraftEditor from "../common/Editor";

export default class TextForm extends Component {

  static propTypes = {
    id: string,
    title: string,
    text: instanceOf(Immutable.Map),
    saveText: func.isRequired,
  }

  static defaultProps = {
    id: null,
    title: "Title",
    text: Immutable.Map(),
  }

  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      text: this.props.text,
    };
    this.changeTitle = this.changeTitle.bind(this);
    this.saveText = this.saveText.bind(this);
    this.textareaRef = this.textareaRef.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({text: nextProps.text, title: nextProps.title});
  }

  changeTitle(e) {
    this.setState({title: e.target.value});
  }

  saveText() {
    const { title } = this.state;
    const text = this.editor.getContent();
    const data = {
      id: this.props.id || guid(),
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
        <div className="title">
          <input
            type="text"
            className="form-control"
            value={this.state.title}
            onChange={this.changeTitle}
          />
        </div>
        <div className="text-content">
          <DraftEditor
            ref={(e) => { this.editor = e; }}
            placeholder={"Dodaj swój tekst"}
            initialText={this.state.text}
          />
        </div>
        <div className="button-row">
          <button className="btn btn-sm btn-default" onClick={this.saveText}>
            Zapisz
          </button>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}
