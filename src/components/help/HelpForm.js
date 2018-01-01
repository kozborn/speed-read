import React from 'react';
import Immutable from 'immutable';
import { instanceOf } from 'prop-types'
import DraftEditor from '../common/Editor'
import { generateQuickGuid } from '../../utils/helpers';

class HelpForm extends React.Component {

  static propTypes = {
    helpEntry: instanceOf(Immutable.Map).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      id: props.helpEntry.get('id', generateQuickGuid()),
      oldId: props.helpEntry.get('id', generateQuickGuid()),
      title: props.helpEntry.get('title'),
      text: props.helpEntry.get('text'),
    }

    this.changeId = this.changeId.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
  }

  getEntry() {
    return {
      id: this.state.id,
      oldId: this.state.oldId,
      title: this.state.title,
      text: this.editor.getContent(),
    }
  }

  changeId(e) {
    this.setState({ 'id': e.target.value })
  }

  changeTitle(e) {
    this.setState({ 'title': e.target.value })
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Id for help text"
          value={this.state.id}
          onChange={this.changeId}
        />
        <input
          type="text"
          placeholder="Tytuł"
          value={this.state.title}
          onChange={this.changeTitle}
        />
        <DraftEditor
          ref={(e) => { this.editor = e }}
          readOnly={false}
          initialText={this.state.text}
        />
      </div>
    )
  }
}

export default HelpForm;
