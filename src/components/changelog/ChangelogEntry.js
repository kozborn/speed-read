import React from 'react'
import { instanceOf, func, bool } from 'prop-types';
import Immutable from 'immutable';
import DraftEditor from '../common/Editor'
import ChangelogForm from './ChangelogForm'
import Button from '../common/Button';

class ChangelogEntry extends React.Component {

  static propTypes = {
    isLogged: bool.isRequired,
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
      this.state.editing && this.props.isLogged ?
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
          <div className="changelog-texts__header">
            <h2>
              {entry.get('version')}
            </h2>
            {this.props.isLogged &&
              <Button icon="right" type="edit" onClick={this.edit}>
                Edytuj
              </Button>
            }
          </div>
          <DraftEditor readOnly initialText={entry.get('text')} />
        </div>
    )
  }
}

export default ChangelogEntry
