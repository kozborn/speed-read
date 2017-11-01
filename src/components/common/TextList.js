import React from "react";
import {instanceOf, func, string} from "prop-types";
import {Map} from "immutable";
import Text from "./Text";

export default class extends React.Component {
  static propTypes = {
    texts: instanceOf(Map).isRequired,
    switchText: func.isRequired,
    textKey: string.isRequired,
  }

  constructor(props) {
    super(props);
    this.switchText = this.switchText.bind(this);
  }

  switchText(id) {
    this.props.switchText(this.props.textKey, id);
  }

  render() {
    const {texts} = this.props;
    return (
      <div className="text-list">
        {texts.map((text, key) => (
          <Text
            key={key}
            id={key}
            title={text.get("title")}
            text={text.get("text")}
            onCheck={this.switchText}
          />),
        ).toList()}
      </div>
    );
  }
}
