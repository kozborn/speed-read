import Immutable from 'immutable';
import { connect } from 'react-redux';
import Settings from '../components/settings/Settings.jsx';
import { getUserDoc } from '../actions/user-actions';

const mapStateToProps = (state) => {
  return {
    userDoc: state.get('user'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDoc: userId => dispatch(getUserDoc(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

