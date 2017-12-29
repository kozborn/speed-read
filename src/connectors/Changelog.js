import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { bool, instanceOf, func } from 'prop-types';
import Changelog from '../components/Changelog';
import ChangelogForm from '../components/changelog/ChangelogForm';
import Spinner from '../components/common/Spinner'
import Button from '../components/common/Button';
import { getChangelog, update, add } from '../actions/changelog'

const newChangelogEntry = Immutable.fromJS({
  version: "",
  text: '',
})

const mapStateToProps = (state) => {
  return {
    isFetching: state.getIn(['changelog', 'isFetching']),
    changelog: state.getIn(['changelog', 'doc', 'changelog'], Immutable.List()),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    update: entry => dispatch(update(entry)),
    add: entry => dispatch(add(entry)),
    getChangelog: () => dispatch(getChangelog()),
  }
};

class ChangelogConnector extends React.Component {
  static propTypes = {
    isFetching: bool.isRequired,
    add: func.isRequired,
    update: func.isRequired,
    changelog: instanceOf(Immutable.List).isRequired,
    getChangelog: func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      newEntryForm: false,
    }
    this.showNewChangelogEntryForm = this.showNewChangelogEntryForm.bind(this);
    this.addNewEntry = this.addNewEntry.bind(this);
  }

  componentDidMount() {
    this.props.getChangelog();
  }

  showNewChangelogEntryForm() {
    this.setState({ newEntryForm: true })
  }

  addNewEntry() {
    this.props.add(this.newChangelogEntryForm.getEntry())
    this.setState({ newEntryForm: false })
  }

  render() {
    return (
      <div className="changelog">

        {this.props.isFetching && <Spinner />}

        {!this.state.newEntryForm &&
          <Button type="add" icon="left" onClick={this.showNewChangelogEntryForm} >Nowy wpis</Button>
        }

        {this.state.newEntryForm &&
          <div>
            <ChangelogForm
              ref={(e) => { this.newChangelogEntryForm = e }}
              changelogEntry={newChangelogEntry}
            />
            <Button type="add" icon="left" onClick={this.addNewEntry} >Dodaj</Button>
          </div>

        }

        {!this.props.isFetching &&
          <Changelog
            update={this.props.update}
            changelog={this.props.changelog}
          />
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangelogConnector);
