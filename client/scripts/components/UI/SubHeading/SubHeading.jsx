import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import styles from './SubHeading.css';

const cx = classNames.bind(styles);

const SubHeading = ({ text, className, style, children }) => {
  const classes = cx('SubHeading', className);

  return <h2 className={classes} style={style}>{text || children}</h2>;
};

SubHeading.displayName = 'SubHeading';

SubHeading.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

SubHeading.defaultProps = {
  text: '',
  className: '',
  style: {},
  children: {},
};

export default SubHeading;
