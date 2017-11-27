import React from 'react';
import { instanceOf, func, string } from 'prop-types';
import _ from 'underscore';
import {connect} from "react-redux";
import Immutable from "immutable";
import UserTexts from "../components/UserTexts";
import withUserDoc from '../hoc/WithUserDoc';
import { clearStatus, removeText, getUserDoc } from '../actions/user-actions';

function mapStateToProps(state) {
  const texts = state.getIn(["user", "doc", 'texts'], Immutable.List());
  const status = state.getIn(['user', 'status']);
  return {
    texts,
    status,
    userDoc: state.get('user'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserDoc: userId => dispatch(getUserDoc(userId)),
    removeText: textId => dispatch(removeText(textId)),
    clearStatus: () => dispatch(clearStatus()),
  };
}

class UserTextsConnect extends React.Component {

  static propTypes = {
    texts: instanceOf(Immutable.List).isRequired,
    clearStatus: func.isRequired,
    removeText: func.isRequired,
    status: string.isRequired,
  }

  componentDidMount() {
    if (!_.isEmpty(this.props.status)) {
      this.props.clearStatus();
    }
  }

  render() {
    return <UserTexts removeText={this.props.removeText} texts={this.props.texts} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withUserDoc(UserTextsConnect));
