import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import capitalize from 'lodash/capitalize';

import styles from './Characteristic.css';

const cx = classNames.bind(styles);

const Characteristic = ({ type, content, imageSrc }) => {
  const capitalizedType = capitalize(type);

  return (
    <div className={cx('Characteristic')}>
      <h2 className={cx('Heading')}>
        <img className={cx('Image')} src={imageSrc} alt="" />
        The {capitalizedType}’s Money Characteristic
      </h2>
    </div>
  );
};

Characteristic.displayName = 'Characteristic';

Characteristic.propTypes = {
  type: PropTypes.oneOf(['visionary', 'producer', 'nurturer', 'epicure', 'independent']),
  content: PropTypes.arrayOf(PropTypes.object),
  imageSrc: PropTypes.string,
};

Characteristic.defaultProps = {
  content: [],
  type: undefined,
  imageSrc: undefined,
};

export default Characteristic;
