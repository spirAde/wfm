import React, { PropTypes } from 'react';
import { reduxForm, propTypes as ReduxFormPropTypes } from 'redux-form';

import classNames from 'classnames/bind';

import { Button, Heading } from '../../../UI';

import styles from './StepCancellingGroup.css';

const cx = classNames.bind(styles);

// TODO: change text
const StepCancellingGroup = ({
  handleSubmit,
  onSubmit,
  submitting,
  onClickPrevPage,
}) => (
  <form onSubmit={handleSubmit(onSubmit)} className={cx('StepCancellingGroup')}>
    <Heading text="Cancel Schedule" />
    <p>
      Smth cancelling text.
    </p>
    <div className={cx('Row')}>
      <Button
        label="Confirm"
        icon="arrow-right"
        iconAlign="right"
        className={cx('Button')}
        isLoading={submitting}
        isDisabled={submitting}
      />
    </div>
    <div className={cx('Row')}>
      <Button
        label="Go back"
        icon="arrow-left"
        iconAlign="left"
        kind="link"
        className={cx('Button')}
        onClick={onClickPrevPage}
      />
    </div>
  </form>
);

StepCancellingGroup.displayName = 'StepCancellingGroup';

StepCancellingGroup.propTypes = {
  ...ReduxFormPropTypes,
  onClickPrevPage: PropTypes.func,
};

StepCancellingGroup.defaultProps = {
  onClickPrevPage: Function.prototype,
};

export default reduxForm({
  form: 'recurring-editing-group-form',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(StepCancellingGroup);
