import { connect } from 'react-redux';
import Immutable from 'immutable';
import Changelog from '../components/Changelog';

const mapStateToProps = (state) => {
  return {
    changelog: state.getIn(['changelog', 'changelog'], Immutable.List()),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Changelog);
