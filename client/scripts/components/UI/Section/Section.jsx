import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import styles from './Section.css';

const cx = classNames.bind(styles);

const Section = ({ border, borderColor, borderWidth, zeroPadding, sectionClassName, style, children }) => {
  const classes = cx('Section', sectionClassName, {
    BottomBorder: border === 'bottom',
    TopBorder: border === 'top',
    Yellow: borderColor === 'yellow',
    Grey: borderColor === 'grey' || borderColor === 'gray',
    Basic: borderWidth === 'basic',
    Fat: borderWidth === 'fat',
    ZeroPadding: zeroPadding,
  });

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};

Section.displayName = 'Section';

Section.propTypes = {
  border: PropTypes.oneOf(['top', 'bottom', '']),
  borderColor: PropTypes.oneOf(['yellow', 'grey', 'gray', '']),
  borderWidth: PropTypes.oneOf(['basic', 'fat', '']),
  zeroPadding: PropTypes.bool, // useful for nested sections, if you don't want combine paddings
  sectionClassName: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

Section.defaultProps = {
  border: '',
  borderColor: '',
  borderWidth: '',
  zeroPadding: false,
  sectionClassName: '',
  style: {},
  children: PropTypes.node,
};

export default Section;
