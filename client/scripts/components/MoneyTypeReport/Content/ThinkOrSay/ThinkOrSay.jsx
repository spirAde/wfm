import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import capitalize from 'lodash/capitalize';

import styles from './ThinkOrSay.css';

const cx = classNames.bind(styles);

const ThinkOrSay = ({ type, content, imageSrc }) => {
  const capitalizedType = capitalize(type);

  return (
    <div className={cx('ThinkOrSay')}>
      <h2 className={cx('Heading')}>
        <img className={cx('Image')} src={imageSrc} alt="" />
        The {capitalizedType} Might Think or Say
      </h2>
    </div>
  );
};

ThinkOrSay.displayName = 'ThinkOrSay';

ThinkOrSay.propTypes = {
  type: PropTypes.oneOf(['visionary', 'producer', 'nurturer', 'epicure', 'independent']),
  content: PropTypes.arrayOf(PropTypes.object),
  imageSrc: PropTypes.string,
};

ThinkOrSay.defaultProps = {
  content: [],
  type: undefined,
  imageSrc: undefined,
};

export default ThinkOrSay;
