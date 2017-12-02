import { connect } from 'react-redux';
import Header from '../components/Header';

const mapStateToProps = (state) => {
  return {
    docId: state.getIn(['user', 'id'], '123'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
