import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import capitalize from 'lodash/capitalize';

import { Checkbox } from '../../../UI';

import styles from './Description.css';

const cx = classNames.bind(styles);

const Description = ({ type, content: { title, content }, imageSrc }) => {
  const capitalizedType = capitalize(type);

  return (
    <div className={cx('Description', capitalizedType)}>
      <Checkbox
        name="showTypeOnDashboard"
        label={`Show ${capitalizedType} insights on my WorthFM dashboard`}
        className={cx('CheckBox')}
        labelClassName={cx('Label')}
      />
      <h2>
        <img className={cx('Image')} src={imageSrc} alt="" />
        The {capitalizedType}
      </h2>
      <div className={cx('Title')} dangerouslySetInnerHTML={{ __html: title }} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

Description.displayName = 'Description';

Description.propTypes = {
  type: PropTypes.oneOf(['visionary', 'producer', 'nurturer', 'epicure', 'independent']),
  content: PropTypes.object,
  imageSrc: PropTypes.string,
};

Description.defaultProps = {
  content: {},
  type: undefined,
  imageSrc: undefined,
};

export default Description;
