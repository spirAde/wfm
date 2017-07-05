import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import styles from './Heading.css';

const cx = classNames.bind(styles);

const Heading = ({ text, className, style, withLine, children }) => {
  const classes = cx('Heading', className, {
    WithLine: withLine,
  });

  return (
    <h1 className={classes} style={style}>
      {text || children}
    </h1>
  );
};

Heading.displayName = 'Heading';

Heading.propTypes = {
  text: PropTypes.string,
  withLine: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

Heading.defaultProps = {
  text: '',
  withLine: false,
  className: '',
  style: {},
  children: undefined,
};

export default Heading;
