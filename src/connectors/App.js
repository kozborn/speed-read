import { connect } from 'react-redux';
import App from '../components/App';

const mapsStateToProps = (state) => {
  return {
    docId: state.getIn(["user", "docId"], ''),
  };
};

export default connect(mapsStateToProps)(App);
