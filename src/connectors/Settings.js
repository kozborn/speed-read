import Immutable from 'immutable';
import { connect } from 'react-redux';
import Settings from '../components/settings/Settings.jsx';

const mapStateToProps = (state) => {
  return {
    userDoc: state.get('user'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

