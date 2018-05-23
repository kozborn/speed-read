import React from 'react';
import Immutable from 'immutable';
import { instanceOf } from 'prop-types'
import DraftEditor from '../common/Editor'
import { generateQuickGuid } from '../../utils/helpers';

class ChangelogForm extends React.Component {

  static propTypes = {
    changelogEntry: instanceOf(Immutable.Map).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      id: props.changelogEntry.get('id', generateQuickGuid()),
      version: props.changelogEntry.get('version'),
      text: props.changelogEntry.get('text'),
    }

    this.changeVersion = this.changeVersion.bind(this);
  }

  getEntry() {
    return {
      id: this.state.id,
      version: this.state.version,
      text: this.editor.getContent(),
    }
  }

  changeVersion(e) {
    this.setState({ 'version': e.target.value })
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Wersja"
          value={this.state.version}
          onChange={this.changeVersion}
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

export default ChangelogForm;
