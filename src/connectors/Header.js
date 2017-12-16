import { connect } from 'react-redux';
import Header from '../components/Header';

const mapStateToProps = (state) => {

  const userId = state.getIn(["user", "id"]) ? state.getIn(["user", "id"]) : localStorage.getItem('userId');
  return {
    userId: userId || '',
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
