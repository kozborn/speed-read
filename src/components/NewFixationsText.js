import React from "react";
import {string} from "prop-types";
import Api from "../api/Api";
import TextForm from "./forms/TextForm";

export default class NewFixationsText extends React.Component {

  static propTypes = {
    documentId: string,
  }

  static defaultProps = {
    documentId: "sample_text",
  }

  constructor(props) {
    super(props);
    this.state = {
      currentText: "",
    };

    this.saveText = this.saveText.bind(this);
  }

  componentWillMount() {
    const {documentId} = this.props;
    Api.getText(documentId)
    .then((jsonResponse) => {
      this.setState({currentText: jsonResponse.fixationsText});
    });
  }

  saveText(value) {
    const docId = this.props.documentId ? this.props.documentId : null;
    Api.saveText(docId, value, "fixationsText").then((response) => {
      this.setState({savedDocument: response, currentText: value});
    });
  }

  render() {
    return (
      <div>
        <TextForm
          text={this.state.currentText}
          saveText={this.saveText}
        />
      </div>
    );
  }

}
