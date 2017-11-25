import Immutable from 'immutable';
import { connect } from 'react-redux';
import Settings from '../components/settings/Settings.jsx';

const mapStateToProps = (state) => {
  return {
    settings: state.get('user', Immutable.Map()),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

