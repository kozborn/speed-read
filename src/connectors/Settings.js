import { connect } from 'react-redux';
import Settings from '../components/Settings';
import { createNewUserDoc } from '../actions/user-actions';

const mapStateToProps = (state) => {
  return {
    userDoc: state.get('user'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewUserDoc: () => dispatch(createNewUserDoc()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
