import React from 'react';
import { connect } from 'react-redux';
import { func, string, object } from 'prop-types';
import { withRouter } from 'react-router';
import NewText from '../components/NewText';
import { addText } from '../actions/user-actions';

const mapStateToProps = (state) => {
  return {
    userDoc: state.get('user'),
    status: state.getIn(['user', 'status']),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveText: text => dispatch(addText(text)),
  };
};

class NewTextConnect extends React.Component {

  static propTypes = {
    saveText: func.isRequired,
    status: string,
    history: object.isRequired,
  }

  static defaultProps = {
    status: "",
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status === 'saved') {
      this.props.history.push('/user-texts');
    }
  }

  render() {
    return <NewText saveText={this.props.saveText} />;
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewTextConnect));
