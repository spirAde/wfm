import React, { PropTypes } from 'react';
import { reduxForm, propTypes as ReduxFormPropTypes } from 'redux-form';

import classNames from 'classnames/bind';

import numeral from 'numeral';

import { Button, Heading } from '../../../UI';

import styles from './StepConfirmFunding.css';

const cx = classNames.bind(styles);

const StepConfirmFunding = ({
  handleSubmit,
  onSubmit,
  onClickPrevPage,
  amount,
  submitting,
}) => (
  <form onSubmit={handleSubmit(onSubmit)} className={cx('StepConfirmFunding')}>
    <Heading text="Activate your retirement account" />
    <p>
      Please confirm: We will transfer {numeral(amount).format('$0,0.00')}&nbsp;
      from your WELLS FARGO BANK 0628 Account and deposit the funds
      to your WorthFM Retirement Account.
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

StepConfirmFunding.displayName = 'StepConfirmFunding';

StepConfirmFunding.propTypes = {
  ...ReduxFormPropTypes,
  amount: PropTypes.number,
};

StepConfirmFunding.defaultProps = {
  amount: 0,
};

export default reduxForm({
  form: 'activation-retirement-form',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(StepConfirmFunding);
