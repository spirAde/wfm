import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import classNames from 'classnames/bind';

import Icon from '../Icon/Icon';
import Spinner from '../Spinner/Spinner';

import styles from './Button.css';

const cx = classNames.bind(styles);

const Button = ({
  kind,
  isDisabled,
  isLoading,
  icon,
  iconAlign,
  label,
  to,
  className,
  labelClassName,
  iconClassName,
  onClick,
  style,
  buttonRef,
}) => {
  const classes = cx(className, 'Button', {
    Disabled: isDisabled || isLoading,
    Primary: kind === 'primary',
    Secondary: kind === 'secondary',
    Link: kind === 'link',
  });

  const labelClasses = cx('Label', labelClassName);

  let renderedComponent = null;

  if (kind === 'link') {
    return (
      <Link className={classes} to={to} onClick={!to && onClick ? onClick : Function.prototype}>
        <div className={cx('Inner')}>
          {
            icon &&
            iconAlign === 'left' &&
            <Icon
              icon={icon}
              width={16}
              height={16}
              style={{ marginRight: 5 }}
              className={iconClassName}
            />
          }
          <div className={labelClasses}>{label}</div>
          {
            icon &&
            iconAlign === 'right' &&
            <Icon
              icon={icon}
              width={16}
              height={16}
              style={{ marginLeft: 5 }}
              className={iconClassName}
            />
          }
        </div>
      </Link>
    );
  } else if (isLoading) {
    renderedComponent = (
      <div className={cx('Inner')}>
        <div className={labelClasses}>{label}</div>
        <Spinner size="xs" color="#a29bb5" center style={{ marginLeft: 5 }} />
      </div>
    );
  } else {
    renderedComponent = (
      <div className={cx('Inner')}>
        {
          icon &&
          iconAlign === 'left' &&
          <Icon
            icon={icon}
            width={20}
            height={20}
            style={{ marginRight: 5 }}
            className={iconClassName}
          />
        }
        <div className={labelClasses}>{label}</div>
        {
          icon &&
          iconAlign === 'right' &&
          <Icon
            icon={icon}
            width={20}
            height={20}
            style={{ marginLeft: 5 }}
            className={iconClassName}
          />
        }
      </div>
    );
  }

  if (to) {
    return (
      <Link
        className={classes}
        style={style}
        ref={buttonRef}
        to={to}
      >
        {renderedComponent}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      style={style}
      disabled={isDisabled || isLoading}
      onClick={isDisabled || isLoading ? Function.prototype : onClick}
      ref={buttonRef}
    >
      {renderedComponent}
    </button>
  );
};

Button.displayName = 'Button';

Button.propTypes = {
  kind: PropTypes.oneOf(['primary', 'secondary', 'link']),
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  icon: PropTypes.string,
  iconAlign: PropTypes.oneOf(['left', 'right']),
  to: PropTypes.string,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string,
  style: PropTypes.object,
  buttonRef: PropTypes.func,
};

Button.defaultProps = {
  kind: 'primary',
  isDisabled: false,
  isLoading: false,
  icon: '',
  iconAlign: 'right',
  to: '',
  className: '',
  labelClassName: '',
  iconClassName: '',
  onClick: Function.prototype,
  label: '',
  style: {},
  buttonRef: Function.prototype,
};

export default Button;
