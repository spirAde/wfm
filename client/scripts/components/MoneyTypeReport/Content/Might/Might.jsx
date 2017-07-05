import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import capitalize from 'lodash/capitalize';

import styles from './Might.css';

const cx = classNames.bind(styles);

const Might = ({ type, content, imageSrc }) => {
  const capitalizedType = capitalize(type);

  return (
    <div className={cx('Might')}>
      <h2 className={cx('Heading')}>
        <img className={cx('Image')} src={imageSrc} alt="" />
        The {capitalizedType} Might...
      </h2>
    </div>
  );
};

Might.displayName = 'Might';

Might.propTypes = {
  type: PropTypes.oneOf(['visionary', 'producer', 'nurturer', 'epicure', 'independent']),
  content: PropTypes.arrayOf(PropTypes.object),
  imageSrc: PropTypes.string,
};

Might.defaultProps = {
  content: [],
  type: undefined,
  imageSrc: undefined,
};

export default Might;
