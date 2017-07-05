import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import styles from './Icon.css';

const cx = classNames.bind(styles);

const Icon = ({
  width = 16,
  height = 16,
  icon,
  className,
  fill,
  stroke,
  strokeWidth,
  style,
  iconRef,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const classes = cx('Icon', className);

  const combinedStyles = {
    fill: fill || 'none',
    stroke: stroke || 'black',
    strokeWidth: strokeWidth || 1,
    height: `${height}px`,
    width: `${width}px`,
    ...style,
  };

  return (
    <div
      className={classes}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={iconRef}
    >
      <svg style={combinedStyles}>
        <use xlinkHref={`#icon-${icon}`} />
      </svg>
    </div>
  );
};

Icon.displayName = 'Icon';

Icon.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  icon: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  className: PropTypes.string,
  style: PropTypes.object,
  iconRef: PropTypes.func,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

Icon.defaultProps = {
  width: 16,
  height: 16,
  icon: '',
  fill: 'none',
  stroke: 'black',
  strokeWidth: 1,
  className: '',
  style: {},
  iconRef: Function.prototype,
  onClick: Function.prototype,
  onMouseEnter: Function.prototype,
  onMouseLeave: Function.prototype,
};

export default Icon;
