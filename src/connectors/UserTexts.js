import React from 'react';
import { instanceOf, func, string } from 'prop-types';
import _ from 'underscore';
import {connect} from "react-redux";
import Immutable from "immutable";
import UserTexts from "../components/UserTexts";
import { clearStatus, removeText } from '../actions/user-actions';

function mapStateToProps(state) {
  const texts = state.getIn(["user", "doc", 'texts'], Immutable.List());
  const status = state.getIn(['user', 'status']);
  return {
    texts,
    status,
    docId: state.getIn(['user', 'id']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
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
    docId: string.isRequired,
  }

  componentDidMount() {
    if (!_.isEmpty(this.props.status)) {
      this.props.clearStatus();
    }
  }

  render() {
    return (<UserTexts
      docId={this.props.docId}
      removeText={this.props.removeText}
      texts={this.props.texts}
    />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTextsConnect);
