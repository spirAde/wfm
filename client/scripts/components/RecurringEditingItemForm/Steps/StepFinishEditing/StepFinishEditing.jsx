import React, { PropTypes } from 'react';

import classNames from 'classnames/bind';

import { Button, Heading } from '../../../UI';

import styles from './StepFinishEditing.css';

const cx = classNames.bind(styles);

// TODO: change text
const StepFinishEditing = ({
  onClickFinish,
}) => (
  <div className={cx('StepFinishEditing')}>
    <Heading text="Edit Transfer" />
    <p>
      Your transfer has been updated.
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

StepFinishEditing.displayName = 'StepFinishEditing';

StepFinishEditing.propTypes = {
  onClickFinish: PropTypes.func,
};

StepFinishEditing.defaultProps = {
  onClickFinish: Function.prototype,
};

export default StepFinishEditing;
