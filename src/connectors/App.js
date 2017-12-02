import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Immutable from 'immutable';
import App from '../components/App';
import { closeNotification } from '../actions/actions';
import { getUserDoc } from '../actions/user-actions';

const mapStateToProps = (state) => {
  const isFetching = state.getIn(['user', 'isFetching']) || state.getIn(['app', 'isFetching']);

  return {
    isFetching,
    docId: state.getIn(["user", "docId"], ''),
    notification: state.getIn(["app", 'notification'], Immutable.Map()),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserDoc: docId => dispatch(getUserDoc(docId)),
    closeNotification: () => dispatch(closeNotification()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
