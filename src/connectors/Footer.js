import { connect } from "react-redux";
import Footer from "../components/Footer";

function mapStateToProps(state) {
  const userId = state.getIn(["user", "id"]) ? state.getIn(["user", "id"]) : localStorage.getItem('userId');
  return {
    userId: userId || '',
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
