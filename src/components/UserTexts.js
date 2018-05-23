import React from 'react';
import { Link } from 'react-router-dom';
import { instanceOf, func, string } from 'prop-types';
import Immutable from 'immutable';
import HelpPortal from './common/HelpPortal'
import TextsList from './user-texts/TextsList';

const UserTexts = ({docId, texts, removeText }) =>
  (
    <div>
      <div className="user-texts__header no-bg">
        <h1 className="with-help">Twoje teksty<HelpPortal helpKey="user-texts" /></h1>
      </div>
      <Link className="new-text" to="/new-text">Dodaj nowy tekst</Link>
      <TextsList
        docId={docId}
        removeText={removeText}
        texts={texts}
      />
    </div>
  );

UserTexts.propTypes = {
  docId: string.isRequired,
  texts: instanceOf(Immutable.List).isRequired,
  removeText: func.isRequired,
};

export default UserTexts;
