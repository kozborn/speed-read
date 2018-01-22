import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar'

const mapStateToProps = (state) => {
  console.log(state.toJS())
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

