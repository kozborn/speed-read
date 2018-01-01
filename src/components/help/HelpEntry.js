import React from 'react'
import { instanceOf, func, bool } from 'prop-types';
import Immutable from 'immutable';
import DraftEditor from '../common/Editor'
import HelpForm from './HelpForm'
import Button from '../common/Button';

class HelpEntry extends React.Component {

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
    this.props.update(this.helpForm.getEntry());
    this.setState({ editing: false })
  }

  render() {
    const { entry } = this.props
    return (
      this.state.editing && this.props.isLogged ?
        <div>
          <HelpForm
            ref={(e) => { this.helpForm = e }}
            helpEntry={entry}
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
          <div className="help-texts__header">
            <h2>
              {entry.get('id')}: {entry.get('title')}
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

export default HelpEntry
