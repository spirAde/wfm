import React, { PropTypes } from 'react';

import classNames from 'classnames/bind';

import numeral from 'numeral';
import capitalize from 'lodash/capitalize';

import { Button, Heading } from '../../../UI';

import styles from './StepFinishCancelling.css';

const cx = classNames.bind(styles);

// TODO: change text
const StepFinishCancelling = ({
  onClickFinish,
}) => (
  <div className={cx('StepFinishCancelling')}>
    <Heading text="Cancel Schedule" />
    <p>
      Smth text finish
    </p>
    <div className={cx('Row')}>
      <Button
        label="Done"
        icon="arrow-right"
        iconAlign="right"
        className={cx('Button')}
        onClick={onClickFinish}
      />
    </div>
  </div>
);

StepFinishCancelling.displayName = 'StepFinishEditing';

StepFinishCancelling.propTypes = {
  onClickFinish: PropTypes.func,
};

StepFinishCancelling.defaultProps = {
  onClickFinish: Function.prototype,
};

export default StepFinishCancelling;
