import React from 'react';
import { func } from 'prop-types';
import TextForm from './forms/TextForm';

const NewText = ({ saveText }) => {
  return (
    <div className="user-texts">
      <TextForm saveText={saveText} />
    </div>
  );
};

NewText.propTypes = {
  saveText: func.isRequired,
};

export default NewText;
