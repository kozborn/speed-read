import React from 'react'
import _ from 'underscore'
import Button from '../common/Button';
import DraftEditor from '../common/Editor';
import { sliceHTMLText } from '../../utils/helpers'
import { getDraftTextSnippet } from '../../utils/editor_helpers';

const getTextSnippet = (text) => {
  if (_.isString(text)) {
    return sliceHTMLText(text, 100);
  }
  return getDraftTextSnippet(text);
}

class StaticText extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    }

    this.edit = this.edit.bind(this)
    this.save = this.save.bind(this)
  }

  edit() {
    this.setState({ 'editing': true })
  }

  save() {
    this.props.save(this.props.id, this.editor.getContent());
    this.setState({ 'editing': false })
  }

  render() {

    const {text, title, id} = this.props

    return (
      <div>
        <div className="default-texts__header">
          <h2>{id}: {title}</h2>
          {!this.state.editing &&
            <Button icon="right" type="edit" onClick={this.edit}>
              Edytuj
            </Button>
          }

          {this.state.editing &&
            <Button icon="right" type="submit" onClick={this.save}>
              Zapisz
            </Button>
          }
        </div>
        <DraftEditor
          ref={(e) => { this.editor = e }}
          readOnly={!this.state.editing}
          initialText={this.state.editing ? text : getTextSnippet(text)}
        />
      </div>
    )
  }
}

export default StaticText;
