import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Immutable from 'immutable';
import App from '../components/App';
import { closeNotification } from '../actions/actions';
import { fetchUserDoc } from '../actions/user-actions';

const mapStateToProps = (state) => {
  const isFetching = state.getIn(['user', 'isFetching']) || state.getIn(['app', 'isFetching']);
  const userId = state.getIn(["user", "id"]) ? state.getIn(["user", "id"]) : localStorage.getItem('userId');
  return {
    isFetching,
    userId,
    notification: state.getIn(["app", 'notification'], Immutable.Map()),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserDoc: userId => dispatch(fetchUserDoc(userId)),
    closeNotification: () => dispatch(closeNotification()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
