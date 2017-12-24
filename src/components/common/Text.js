import React from "react";
import _ from 'underscore';
import { oneOfType, object, string, func, instanceOf} from "prop-types";
import { sliceHTMLText } from "../../utils/helpers";
import DraftEditor from '../common/Editor';
import { getDraftTextSnippet } from '../../utils/editor_helpers';

export default class extends React.Component {

  static propTypes = {
    id: string.isRequired,
    title: string.isRequired,
    text: oneOfType([
      object, string,
    ]).isRequired,
    onCheck: func.isRequired,
  }

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.getText = this.getText.bind(this);
  }

  onClick() {
    this.props.onCheck(this.props.id);
  }

  getText() {
    const { text } = this.props;
    if (_.isString(text)) {
      return sliceHTMLText(text, 100)
    }
    return <DraftEditor readOnly initialText={getDraftTextSnippet(text)} />
  }

  render() {
    const { title } = this.props;
    return (
      <div className="snippet">
        <div onClick={this.onClick}>
          <h5>{title}</h5>
          <div className="snippet__text">
            {this.getText()}
          </div>
        </div>
      </div>
    );
  }
}
