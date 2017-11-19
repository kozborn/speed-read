import React from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import TextForm from '../components/forms/TextForm';
import { addText } from '../actions/user-actions';

const NewText = ({ saveText }) => {
  return (
    <div>
      <TextForm saveText={saveText} />
    </div>
  );
};

NewText.propTypes = {
  saveText: func.isRequired,
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveText: text => dispatch(addText(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewText);
