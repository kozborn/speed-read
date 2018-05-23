import React from 'react'
import Immutable from 'immutable'
import { instanceOf, bool, func } from 'prop-types'
import { connect } from 'react-redux'
import _ from 'underscore'
import Button from '../components/common/Button'
import HelpPage from '../components/HelpPage'
import HelpForm from '../components/help/HelpForm'
import Spinner from '../components/common/Spinner'
import { getHelp, update, add } from '../actions/help-actions'

const newHelpEntry = Immutable.fromJS({
  title: "",
  text: "",
})

class HelpPageConnector extends React.Component {

  static propTypes = {
    isLogged: bool.isRequired,
    isFetching: bool.isRequired,
    getHelpDoc: func.isRequired,
    update: func.isRequired,
    helpDoc: instanceOf(Immutable.Map).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      newEntryForm: false,
    }

    this.addNewEntry = this.addNewEntry.bind(this)
    this.showNewHelpEntryForm = this.showNewHelpEntryForm.bind(this);
  }

  componentDidMount() {
    if (this.props.helpDoc.isEmpty()) {
      this.props.getHelpDoc();
    }
  }

  addNewEntry() {
    // TODO
  }

  showNewHelpEntryForm() {
    this.setState({ newEntryForm: true })
  }

  render() {
    return (
      <div className="help">
        {this.props.isFetching &&
          <Spinner />
        }

        {!this.state.newEntryForm && this.props.isLogged &&
          <Button type="add" icon="left" onClick={this.showNewHelpEntryForm} >Nowy wpis</Button>
        }

        {this.state.newEntryForm && this.props.isLogged &&
          <div>
            <HelpForm
              ref={(e) => { this.showNewHelpEntryForm = e }}
              helpEntry={newHelpEntry}
            />
            <Button type="add" icon="left" onClick={this.addNewEntry} >Dodaj</Button>
          </div>

        }

        {!this.isFetching &&
          <HelpPage
            helpDoc={this.props.helpDoc}
            update={this.props.update}
            isLogged={this.props.isLogged}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLogged: state.getIn(['app', 'isLogged']),
    isFetching: state.getIn(['help', 'isFetching']),
    helpDoc: state.getIn(['help', 'doc'], Immutable.Map()),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getHelpDoc: () => dispatch(getHelp()),
    update: entry => dispatch(update(entry)),
    add: entry => dispatch(add(_.extend(entry, {timestamp: Date.now()}))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpPageConnector)
