import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import classNames from 'classnames/bind';

import styles from './TextLink.css';

const cx = classNames.bind(styles);

const TextLink = ({ className, style, onClick, to, text, children, isDisabled, ...otherProps }) => {
  const classes = cx(className, 'TextLink', {
    Disabled: isDisabled,
  });

  return (
    <Link
      to={to}
      className={classes}
      style={style}
      onClick={!to && onClick ? onClick : Function.prototype}
      {...otherProps}
    >
      {text || children}
    </Link>
  );
};

TextLink.displayName = 'TextLink';

TextLink.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  to: PropTypes.string,
  text: PropTypes.string,
  isDisabled: PropTypes.bool,
};

TextLink.defaultProps = {
  children: undefined,
  className: '',
  style: {},
  onClick: Function.prototype,
  to: '',
  text: '',
  isDisabled: false,
};

export default TextLink;
