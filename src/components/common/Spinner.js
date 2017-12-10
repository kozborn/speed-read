import React from 'react';
import logo from '../../assets/Logo50x50.png';

const Spinner = () =>
  (
    <div className="spinner-container">
      <div className="spinner">
        <img src={logo} alt="*" />
      </div>
    </div>
  );

export default Spinner;
