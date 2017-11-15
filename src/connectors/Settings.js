import React from 'react';
import { connect } from 'react-redux';
import SettingsComponent from '../components/settings/Settings.jsx';

class Settings extends React.Component {
  render() {
    return (
      <SettingsComponent />
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

