import React, { PropTypes } from 'react';

import classNames from 'classnames/bind';

import { Button, Heading } from '../../../UI';

import styles from './StepFinish.css';

const cx = classNames.bind(styles);

const StepFinish = ({ onClickFinish }) => (
  <div className={cx('StepFinish')}>
    <Heading text="Activate your retirement account" />
    <p>
      Thank you, we are in process of funding your account(s) and it typically takes
      3-5 business days to complete. We will let you know when finished.
    </p>
    <div className={cx('Row')}>
      <Button
        label="Done"
        icon="arrow-right"
        iconAlign="right"
        onClick={onClickFinish}
      />
    </div>
  </div>
);

StepFinish.displayName = 'StepFinish';

StepFinish.propTypes = {
  onClickFinish: PropTypes.func,
};

StepFinish.defaultProps = {
  onClickFinish: Function.prototype,
};

export default StepFinish;
