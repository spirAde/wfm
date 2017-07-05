import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import styles from './Label.css';

const cx = classNames.bind(styles);

const Label = ({ text, labelFor, className, style }) => {
  const classes = cx('Label', className);

  return (
    <label htmlFor={labelFor} className={classes} style={style}>
      {text}
    </label>
  );
};

Label.displayName = 'Label';

Label.propTypes = {
  text: PropTypes.string,
  labelFor: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

Label.defaultProps = {
  text: '',
  labelFor: '',
  className: '',
  style: {},
};

export default Label;
