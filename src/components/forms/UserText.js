import React, {Component} from "react";
import Api from "../../api/Api";

class UserText extends Component {

  constructor(props) {
    super(props);
    this.saveText = this.saveText.bind(this);
    this.textAreaRef = this.textAreaRef.bind(this);
  }

  textAreaRef(e) {
    this.textarea = e;
  }

  saveText() {
    Api.saveText(null, this.textarea.value);
  }

  render() {
    return (
      <div className="user-text-form">
        <textarea
          ref={this.textAreaRef}
          className="form-control"
        />
        <button className="save" onClick={this.saveText}>
          Zapisz
        </button>
        <div className="clearfix" />
      </div>
    );
  }
}

export default UserText;
