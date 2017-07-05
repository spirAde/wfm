import React, { PropTypes } from 'react';
import { reduxForm, propTypes as ReduxFormPropTypes } from 'redux-form';

import classNames from 'classnames/bind';

import numeral from 'numeral';

import { Button, Heading } from '../../../UI';

import styles from './StepCancellingItem.css';

const cx = classNames.bind(styles);

// TODO: change text
const StepCancellingItem = ({
  handleSubmit,
  onSubmit,
  submitting,
  onClickPrevPage,
  amount,
  date,
}) => (
  <form onSubmit={handleSubmit(onSubmit)} className={cx('StepCancellingItem')}>
    <Heading text="Cancel Transfer" />
    <p>
      Are you sure you would like to cancel this transfer
      of {numeral(amount).format('$0,0.00')} on {date.format('MM/DD/YYYY')}?
      This will not affect the rest of the transfers in this schedule.
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

StepCancellingItem.displayName = 'StepCancellingItem';

StepCancellingItem.propTypes = {
  ...ReduxFormPropTypes,
  amount: PropTypes.number,
  date: PropTypes.object,
  onClickPrevPage: PropTypes.func,
};

StepCancellingItem.defaultProps = {
  amount: undefined,
  date: undefined,
  onClickPrevPage: Function.prototype,
};

export default reduxForm({
  form: 'recurring-editing-item-form',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(StepCancellingItem);
