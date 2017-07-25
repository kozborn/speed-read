import React from "react";
import {instanceOf, func} from "prop-types";
import {List} from "immutable";
import Text from "./Text";
import {guid} from "../../utils/helpers";

export default class extends React.Component {

  static propTypes = {
    texts: instanceOf(List).isRequired,
    setTextToEdit: func.isRequired,
  }

  render() {
    return (
      <div>
        {this.props.texts.map((text) => {
          return <Text key={guid()} text={text} setTextToEdit={this.props.setTextToEdit} />;
        }).toList()}
      </div>
    );
  }
}
