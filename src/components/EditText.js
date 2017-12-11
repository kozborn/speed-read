import React from 'react';
import { func, instanceOf } from 'prop-types';
import Immutable from "immutable";
import TextForm from './forms/TextForm';

const EditText = ({
  textToEdit,
  saveText,
}) => {
  return (
    <div className="user-texts">
      <TextForm
        id={textToEdit.get('id')}
        title={textToEdit.get('title')}
        text={textToEdit.get('text')}
        saveText={saveText}
      />
    </div>
  );
};

EditText.propTypes = {
  saveText: func.isRequired,
  textToEdit: instanceOf(Immutable.Map).isRequired,
};

export default EditText;
