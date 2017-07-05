import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import capitalize from 'lodash/capitalize';

import styles from './Recommendation.css';

const cx = classNames.bind(styles);

const Recommendation = ({ type, content, imageSrc }) => {
  const capitalizedType = capitalize(type);

  return (
    <div className={cx('Recommendation')}>
      <h2 className={cx('Heading')}>
        <img className={cx('Image')} src={imageSrc} alt="" />
        Recommended Next Steps for The {capitalizedType}
      </h2>
    </div>
  );
};

Recommendation.displayName = 'Recommendation';

Recommendation.propTypes = {
  type: PropTypes.oneOf(['visionary', 'producer', 'nurturer', 'epicure', 'independent']),
  content: PropTypes.arrayOf(PropTypes.object),
  imageSrc: PropTypes.string,
};

Recommendation.defaultProps = {
  content: [],
  type: undefined,
  imageSrc: undefined,
};

export default Recommendation;
