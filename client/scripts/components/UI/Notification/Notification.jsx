import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import Icon from '../Icon/Icon';

import styles from './Notification.css';

const cx = classNames.bind(styles);

const Notification = ({
  type = 'info',
  children,
  style,
  className,
  isClosable = false,
  onClick = Function.prototype,
}) => {
  const classes = cx('Notification', className, {
    Info: type === 'info',
    Error: type === 'error',
    Success: type === 'success',
  });

  return (
    <div className={classes} style={style}>
      {isClosable && <Icon icon="close" className={cx('Close')} stroke="none" onClick={onClick} />}
      <div>
        {children}
      </div>
    </div>
  );
};

Notification.displayName = 'Notification';

Notification.propTypes = {
  type: PropTypes.oneOf(['info', 'error', 'success']),
  children: PropTypes.node,
  isClosable: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

Notification.defaultProps = {
  type: 'info',
  children: [],
  isClosable: false,
  onClick: Function.prototype,
  className: '',
  style: {},
};

export default Notification;
