import React from 'react';
import { connect } from "react-redux";
import Immutable from "immutable";
import { withRouter } from "react-router";
import { matchPath } from "react-router-dom";
import { instanceOf, string, object, func} from 'prop-types';
import EditText from "../components/EditText";
import { updateText } from '../actions/user-actions';

const mapStateToProps = (state) => {
  const texts = state.getIn(["user", "doc", 'texts'], Immutable.List());
  const status = state.getIn(['user', 'status']);
  return {
    texts,
    status,
    docId: state.getIn(['user', 'id']),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveText: text => dispatch(updateText(text)),
  };
};

class EditTextConnect extends React.Component {

  static propTypes = {
    texts: instanceOf(Immutable.List).isRequired,
    status: string.isRequired,
    history: object.isRequired,
    saveText: func.isRequired,
  }

  constructor(props) {
    super(props);

    this.getTextToEdit = this.getTextToEdit.bind(this);
  }

  getTextToEdit() {
    const match = matchPath(this.props.history.location.pathname, {
      // You can share this string as a constant if you want
      path: "/:module/:userId/:textToEdit",
    });
    const currentTextToEditId = match.params.textToEdit;
    return this.props.texts.find(text => text.get('id') === currentTextToEditId);
  }

  render() {
    return (<EditText
      saveText={this.props.saveText}
      status={this.props.status}
      textToEdit={this.getTextToEdit()}
    />);
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditTextConnect));
