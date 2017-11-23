import React from 'react';
import { Link } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import Immutable from 'immutable';
import Texts from './user-texts/Texts';

const UserTexts = ({ texts }) =>
  (
    <div>
      <div className="user_texts__text-header">
        <h2>Twoje teksty</h2>
        <Link className="new-text" to="/new-text">Dodaj nowy tekst</Link>
      </div>
      <Texts texts={texts} />
    </div>
  );

UserTexts.propTypes = {
  texts: instanceOf(Immutable.List).isRequired,
};

export default UserTexts;
