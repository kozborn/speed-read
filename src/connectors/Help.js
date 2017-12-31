import React from 'react'
import Immutable from 'immutable'
import { instanceOf, bool, func } from 'prop-types'
import { connect } from 'react-redux'
import Help from '../components/Help'
import Spinner from '../components/common/Spinner'
import { getHelp } from '../actions/help'

class HelpConnector extends React.Component {

  static propTypes = {
    hasBeenFetched: bool.isRequired,
    helpContent: instanceOf(Immutable.Map).isRequired,
    isFetching: bool.isRequired,
    getHelp: func.isRequired,
  }

  componentDidMount() {
    if (!this.props.hasBeenFetched) {
      this.props.getHelp();
    }
  }

  render() {
    return this.props.isFetching ?
      <Spinner />
    :
      <Help helpContent={this.props.helpContent} />
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.getIn(['help', 'isFetching']),
    hasBeenFetched: !state.getIn(['help', 'doc'], Immutable.Map()).isEmpty(),
    helpContent: state.getIn(['help', 'doc', ownProps.helpKey], Immutable.Map()),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getHelp: () => dispatch(getHelp()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpConnector);
