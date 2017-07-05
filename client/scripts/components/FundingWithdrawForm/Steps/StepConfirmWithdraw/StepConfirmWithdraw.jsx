import React, { PropTypes } from 'react';
import { reduxForm, propTypes as ReduxFormPropTypes } from 'redux-form';

import classNames from 'classnames/bind';

import numeral from 'numeral';
import capitalize from 'lodash/capitalize';

import { Heading, Button } from '../../../UI';

import styles from './StepConfirmWithdraw.css';

const cx = classNames.bind(styles);

const StepConfirmWithdraw = ({
  handleSubmit,
  onSubmit,
  onClickPrevPage,
  amount,
  account,
  submitting,
}) => (
  <form onSubmit={handleSubmit(onSubmit)} className={cx('StepConfirmWithdraw')}>
    <Heading text="Please confirm withdraw" />
    <p>
      Please confirm: We will transfer {numeral(amount).format('$0,0.00')}&nbsp;
      from your WorthFM {capitalize(account)} Account and deposit the funds&nbsp;
      to your BANK OF AMERICA, N.A. (3905) account.
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

StepConfirmWithdraw.displayName = 'StepConfirmWithdraw';

StepConfirmWithdraw.propTypes = {
  amount: PropTypes.number,
  account: PropTypes.oneOf(['savings', 'investment', 'retirement']),
  onSubmit: PropTypes.func.isRequired,
  onClickPrevPage: PropTypes.func.isRequired,
  ...ReduxFormPropTypes,
};

StepConfirmWithdraw.defaultProps = {
  amount: undefined,
  account: undefined,
};

export default reduxForm({
  form: 'funding-withdraw-form',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(StepConfirmWithdraw);
