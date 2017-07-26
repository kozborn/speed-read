import React from "react";
import {string, func} from "prop-types";

export default class extends React.Component {

  static propTypes = {
    id: string.isRequired,
    title: string.isRequired,
    text: string.isRequired,
    onCheck: func.isRequired,
  }

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onCheck(this.props.id);
  }

  render() {
    const {title, text} = this.props;

    return (
      <div className="text">
        <div onClick={this.onClick}>
          <h3>{title}</h3>
          <div className="snippet">{text.slice(0, 200)}</div>
        </div>
      </div>
    );
  }
}
