import React from 'react';
import { Link } from 'react-router-dom';
import { instanceOf, func } from 'prop-types';
import Immutable from 'immutable';
import Texts from './user-texts/Texts';

const UserTexts = ({ texts, removeText }) =>
  (
    <div>
      <div className="user_texts__text-header">
        <h2>Twoje teksty</h2>
        <Link className="new-text" to="/new-text">Dodaj nowy tekst</Link>
      </div>
      <Texts removeText={removeText} texts={texts} />
    </div>
  );

UserTexts.propTypes = {
  texts: instanceOf(Immutable.List).isRequired,
  removeText: func.isRequired,
};

export default UserTexts;
