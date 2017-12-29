import React from 'react'
import { instanceOf, func } from 'prop-types';
import Immutable from 'immutable';
import DraftEditor from '../common/Editor'
import ChangelogForm from './ChangelogForm'
import Button from '../common/Button';

class ChangelogEntry extends React.Component {

  static propTypes = {
    update: func.isRequired,
    entry: instanceOf(Immutable.Map).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    }

    this.edit = this.edit.bind(this);
    this.update = this.update.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  edit() {
    this.setState({ editing: true })
  }

  cancel() {
    this.setState({ editing: false })
  }

  update() {
    this.props.update(this.changelogForm.getEntry());
    this.setState({ editing: false })
  }

  render() {
    const {entry} = this.props

    return (
      this.state.editing ?
        <div>
          <ChangelogForm
            ref={(e) => { this.changelogForm = e }}
            changelogEntry={entry}
          />
          <Button icon="right" type="cancel" onClick={this.cancel}>
            Anuluj
          </Button>
          <Button icon="right" type="submit" onClick={this.update}>
            Zapisz
          </Button>
        </div>
      :
        <div>
          <h2>
            {entry.get('version')}
            <Button icon="right" type="edit" onClick={this.edit}>
              Edytuj
            </Button>
          </h2>
          <DraftEditor readOnly initialText={entry.get('text')} />
        </div>
    )
  }
}

export default ChangelogEntry
