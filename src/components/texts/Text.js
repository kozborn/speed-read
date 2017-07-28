import React from "react";
import {Map} from "immutable";
import {instanceOf, func} from "prop-types";

export default class extends React.Component {

  static propTypes = {
    text: instanceOf(Map).isRequired,
    setTextToEdit: func.isRequired,
  }

  constructor(props) {
    super(props);
    this.setTextToEdit = this.setTextToEdit.bind(this);
  }

  setTextToEdit() {
    this.props.setTextToEdit(this.props.text.get("id"));
  }

  render() {
    const {text} = this.props;
    return (
      <div>
        <h5>{text.get("title")}
          <button className="btn btn-sm btn-default pull-right" onClick={this.setTextToEdit}>Edytuj</button>
        </h5>
        <div>{text.get("text")}</div>
      </div>
    );
  }
}
