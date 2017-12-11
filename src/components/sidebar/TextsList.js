import React from "react";
import {instanceOf, func} from "prop-types";
import {List} from "immutable";
import Text from "./Text";

export default class extends React.Component {

  static propTypes = {
    texts: instanceOf(List).isRequired,
    setTextToEdit: func.isRequired,
  }

  render() {
    return (
      <div>
        {this.props.texts.map((text, key) => {
          return <Text key={key} text={text} setTextToEdit={this.props.setTextToEdit} />;
        }).toList()}
      </div>
    );
  }
}
