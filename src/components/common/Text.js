import React from "react";
import {string, func} from "prop-types";
import { sliceHTMLText } from "../../utils/helpers";

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
          <h5>{title}</h5>
          <div className="snippet">
            {sliceHTMLText(text)}
          </div>
        </div>
      </div>
    );
  }
}
