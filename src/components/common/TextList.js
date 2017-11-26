import React from "react";
import {instanceOf, func, string} from "prop-types";
import Immutable from "immutable";
import Text from "./Text";

export default class extends React.Component {
  static propTypes = {
    texts: instanceOf(Immutable.List).isRequired,
    checkText: func.isRequired,
    textKey: string.isRequired,
    save: func.isRequired,
  }

  constructor(props) {
    super(props);
    this.checkText = this.checkText.bind(this);
  }

  checkText(id) {
    this.props.checkText(this.props.textKey, id);
    this.props.save();
  }

  render() {
    const {texts} = this.props;
    return (
      <div className="text-list">
        {texts.map(text => (
          <Text
            key={text.get('id')}
            id={text.get('id')}
            title={text.get("title")}
            text={text.get("text")}
            onCheck={this.checkText}
          />),
        ).toList()}
      </div>
    );
  }
}
