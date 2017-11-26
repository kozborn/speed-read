import React from 'react';
import { connect } from "react-redux";
import EditText from "../components/EditText";

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

class EditTextConnect extends React.Component {
  render() {
    return <EditText />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTextConnect);
