import React from "react";

export default class extends React.Component {
  render() {
    const {text} = this.props;
    return (
      <div>
        <h3>{text.get("title")}</h3>
        <div>{text.get("text")}</div>
      </div>
    );
  }
}
