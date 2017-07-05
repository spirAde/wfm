import React, { PropTypes } from 'react';
import { reduxForm, propTypes as ReduxFormPropTypes } from 'redux-form';

import classNames from 'classnames/bind';

import numeral from 'numeral';
import capitalize from 'lodash/capitalize';

import { Heading, Button } from '../../../UI';

import styles from './StepConfirmTransfer.css';

const cx = classNames.bind(styles);

const StepConfirmTransfer = ({
  handleSubmit,
  onSubmit,
  onClickPrevPage,
  amount,
  from,
  to,
  submitting,
}) => (
  <form onSubmit={handleSubmit(onSubmit)} className={cx('StepConfirmTransfer')}>
    <Heading text="Please confirm transfer" />
    <p>
      Please confirm: We will transfer {numeral(amount).format('$0,0.00')}&nbsp;
      from your WorthFM {capitalize(from)} Account and deposit the funds&nbsp;
      to your WorthFM {capitalize(to)} Account.
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

StepConfirmTransfer.displayName = 'StepConfirmTransfer';

StepConfirmTransfer.propTypes = {
  amount: PropTypes.number,
  from: PropTypes.oneOf(['savings', 'investment', 'retirement']),
  to: PropTypes.oneOf(['savings', 'investment', 'retirement']),
  onSubmit: PropTypes.func.isRequired,
  onClickPrevPage: PropTypes.func.isRequired,
  ...ReduxFormPropTypes,
};

StepConfirmTransfer.defaultProps = {
  amount: undefined,
  from: undefined,
  to: undefined,
};

export default reduxForm({
  form: 'funding-transfer-form',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(StepConfirmTransfer);
