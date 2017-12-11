import React from 'react';
import { instanceOf, func, string } from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import Button from '../common/Button';
import DraftEditor from '../common/Editor'
import HTMLTextSnippet from '../common/HTMLTextSnippet';

const Texts = ({ docId, texts, removeText }) =>
  (
    <ul>
      {texts.map((text, key) => {
        return (
          <li key={key}>
            <div className="text-header">
              <h2>{text.get('title')}</h2>
              <Link className={cn('edit', 'icon-right')} to={`/edit-text/${docId}/${text.get('id')}`}>
                Edycja
              </Link>
              <Button icon="right" type="delete" onClick={() => removeText(text.get('id'))}>
                Usuń
              </Button>
            </div>
            <DraftEditor readonly initialText={text.get('text')} />
            {/*
              <HTMLTextSnippet text={text.get('text')} length={100} />
            */}
          </li>
        );
      })}
    </ul>
  );

Texts.propTypes = {
  docId: string.isRequired,
  texts: instanceOf(Immutable.List).isRequired,
  removeText: func.isRequired,
};

export default Texts;
