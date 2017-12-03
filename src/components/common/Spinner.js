import React from 'react';
import logo from '../../assets/Logo-50x50.gif';

const Spinner = () =>
  (
    <div className="spinner-container">
      <div className="spinner">
        <img src={logo} alt="*" />
      </div>
    </div>
  );

export default Spinner;
