import React, { PropTypes } from 'react';
import { reduxForm, propTypes as ReduxFormPropTypes } from 'redux-form';

import classNames from 'classnames/bind';

import numeral from 'numeral';
import capitalize from 'lodash/capitalize';

import { Button, Heading } from '../../../UI';

import styles from './StepConfirmDeposit.css';

const cx = classNames.bind(styles);

const StepConfirmDeposit = ({
  handleSubmit,
  onSubmit,
  onClickPrevPage,
  amount,
  account,
  isRecurring,
  closestRecurringDate,
  periodicityText,
  submitting,
}) => (
  <form onSubmit={handleSubmit(onSubmit)} className={cx('StepConfirmDeposit')}>
    <Heading text="Fund your account" />
    <p>
      Please confirm: We will transfer {numeral(amount).format('$0,0.00')}&nbsp;
      from your BANK OF AMERICA, N.A. 3905 Account and deposit the
      funds to your WorthFM {capitalize(account)} Account
      {
        isRecurring &&
        ` beginning on ${closestRecurringDate}. This transfer will occur on ${periodicityText}`
      }.
    </p>
    <div className={cx('Row')}>
      <Button
        label="Submit"
        icon="arrow-right"
        iconAlign="right"
        isLoading={submitting}
        isDisabled={submitting}
      />
    </div>
    <div className={cx('Row')}>
      <Button
        kind="link"
        icon="arrow-left"
        iconAlign="left"
        label="Go back"
        onClick={onClickPrevPage}
      />
    </div>
  </form>
);

StepConfirmDeposit.displayName = 'StepConfirmDeposit';

StepConfirmDeposit.propTypes = {
  ...ReduxFormPropTypes,
  amount: PropTypes.number,
  account: PropTypes.oneOf(['savings', 'investment', 'retirement', undefined]),
  isRecurring: PropTypes.bool,
  closestRecurringDate: PropTypes.string,
  periodicityText: PropTypes.string,
};

StepConfirmDeposit.defaultProps = {
  amount: 0,
  account: undefined,
  isRecurring: false,
  closestRecurringDate: '',
  periodicityText: '',
};

export default reduxForm({
  form: 'funding-deposit-form',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(StepConfirmDeposit);
