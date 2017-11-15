import { connect } from 'react-redux';
import App from '../components/App';

const mapsStateToProps = (state) => {
  const isFetching = state.getIn(['user', 'isFetching']) || state.getIn(['app', 'isFetching'])

  return {
    isFetching,
    docId: state.getIn(["user", "docId"], ''),
  };
};

export default connect(mapsStateToProps)(App);
