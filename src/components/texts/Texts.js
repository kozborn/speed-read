import React from "react";
import {func, string, instanceOf} from "prop-types";
import {Map} from "immutable";
import {getTextsFromDocument} from "../../utils/helpers";
import TextsList from "./TextsList";

export default class extends React.Component {

  static propTypes = {
    getDoc: func.isRequired,
    docId: string.isRequired,
    saveText: func.isRequired,
    document: instanceOf(Map).isRequired,
  }

  componentWillMount() {
    this.props.getDoc(this.props.docId);
  }

  render() {
    return (
      <div className="user-texts">
        {this.props.docId ?
          <div>
            <div>Twoje teksty</div>
            <TextsList texts={getTextsFromDocument(this.props.document)} />
          </div>
        :
          <div>Nie masz jeszcze swojego documnetu</div>
        }
      </div>
    );
  }

}

