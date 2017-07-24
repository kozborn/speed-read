import React from "react";
import Text from "./Text";
import {guid} from "../../utils/helpers";

export default class extends React.Component {
  render() {
    return (
      <div>
        {this.props.texts.map((text) => {
          console.log(text);
          return <Text key={guid()} text={text} />;
        }).toList()}
      </div>
    );
  }
}
