import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import Icon from '../Icon/Icon';

import styles from './Tile.css';

const cx = classNames.bind(styles);

const Tile = ({ children, isClosable, onHide, eyebrow, tileClassName, style }) => (
  <div className={cx('Tile', tileClassName)} style={style}>
    {
      isClosable &&
      <div className={cx('CloseZone')} onClick={onHide}>
        <Icon icon="close" style={{ opacity: 0.4, stroke: 'none' }} />
      </div>
    }
    {
      !!eyebrow &&
      <div className={cx('EyeBrow')}>{eyebrow}</div>
    }
    {children}
  </div>
);

Tile.displayName = 'Tile';

Tile.propTypes = {
  children: PropTypes.node,
  isClosable: PropTypes.bool,
  onHide: PropTypes.func,
  eyebrow: PropTypes.string,
  tileClassName: PropTypes.string,
  style: PropTypes.object,
};

Tile.defaultProps = {
  children: {},
  isClosable: false,
  onHide: Function.prototype,
  eyebrow: '',
  tileClassName: '',
  style: {},
};

export default Tile;
