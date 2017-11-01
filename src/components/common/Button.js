import React from 'react';
import cn from 'classnames';
import { string, func, oneOf } from 'prop-types';

const Button = props =>
  <button onClick={props.onClick} className={cn("btn", props.className, props.type, props.icon)}>
    {props.label !== "" && props.label}
  </button>;

const types = ['apply', 'clear', 'submit', 'delete'];

Button.propTypes = {
  type: oneOf(types),
  icon: oneOf(['', 'left', 'right']),
  onClick: func.isRequired,
  label: string,
  className: string,
};

Button.defaultProps = {
  label: "",
  className: "",
  icon: '',
  type: 'apply',
};

export default Button;
