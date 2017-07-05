import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import Icon from '../Icon/Icon';

import { match } from '../../../utils/match';

import styles from './Spinner.css';

const cx = classNames.bind(styles);

const Spinner = ({ size, center, color, className, style }) => {
  const sizePx = match(size, {
    xs: 20,
    s: 32,
    m: 48,
    l: 60,
  }, 90);

  const spinnerClasses = cx('Spinner', 'Circle');
  const centerClasses = cx('Spinner', className, {
    Center: center,
  });

  return (
    <div className={centerClasses} style={style}>
      <div className={spinnerClasses}>
        <Icon icon="loader" width={sizePx} height={sizePx} fill={color} />
      </div>
    </div>
  );
};

Spinner.displayName = 'Spinner';

Spinner.propTypes = {
  size: PropTypes.oneOf(
    ['xs', 's', 'm', 'l', 'xl'],
  ),
  center: PropTypes.bool,
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

Spinner.defaultProps = {
  center: false,
  size: 'l',
  color: 'black',
  className: '',
  style: {},
};

export default Spinner;
