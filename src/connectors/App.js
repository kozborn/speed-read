import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import App from '../components/App';

const mapStateToProps = (state) => {
  const isFetching = state.getIn(['user', 'isFetching']) || state.getIn(['app', 'isFetching'])

  return {
    isFetching,
    docId: state.getIn(["user", "docId"], ''),
  };
};

export default withRouter(connect(mapStateToProps)(App));
