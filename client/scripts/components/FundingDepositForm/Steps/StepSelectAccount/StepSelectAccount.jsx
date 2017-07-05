import React, { PropTypes } from 'react';
import { Field as ReduxFormField, reduxForm, propTypes as ReduxFormPropTypes } from 'redux-form';

import classNames from 'classnames/bind';

import numeral from 'numeral';

import { Button, Field, Heading, Spinner } from '../../../UI';
import validate from '../../validate';
import { accountOptions } from '../../../../utils/options';

import styles from './StepSelectAccount.css';

const cx = classNames.bind(styles);

const renderSelectField = ({
  input,
  meta: { touched, error, active },
  label,
  className,
  options,
}) => {
  const isError = touched && error && !active;

  return (
    <Field
      type="select"
      placeholder="Choose one"
      label={label}
      className={className}
      options={options}
      errorText={isError && error}
      {...input}
    />
  );
};

const StepSelectAccount = ({
  onSubmit,
  onClickPrevPage,
  submitting,
  valid,
  isRecurring,
  bankIsLoading,
  amount,
  periodicityText,
}) => (
  <div className={cx('StepSelectAccount')}>
    <Heading text="Fund your account" />
    <div className={cx('Row')}>
      <Field label="Amount:" className={cx('Amount')} type="static">
        <div>{numeral(amount).format('$0,0.00')}</div>
      </Field>
      {
        isRecurring &&
        <Field label="When:" type="static">
          <div>{periodicityText}</div>
        </Field>
      }
      <Field label="From:" type="static">
        {
          bankIsLoading
          ? <Spinner size="xs" center className={cx('Spinner')} />
          : <div>BANK OF AMERICA, N.A. (3905)</div>
        }
      </Field>
    </div>
    <div className={cx('Row')}>
      <ReduxFormField
        name="account"
        component={renderSelectField}
        label="Which WorthFM account should these funds to go?"
        options={accountOptions}
      />
    </div>
    <div className={cx('Row')}>
      <Button
        label="Continue"
        icon="arrow-right"
        iconAlign="right"
        isDisabled={submitting || !valid}
        onClick={onSubmit}
        className={cx('Button')}
      />
    </div>
    <div className={cx('Row')}>
      <Button
        label="Go back"
        icon="arrow-left"
        iconAlign="left"
        kind="link"
        onClick={onClickPrevPage}
        className={cx('Button')}
      />
    </div>
  </div>
);

StepSelectAccount.displayName = 'StepSelectAccount';

StepSelectAccount.propTypes = {
  amount: PropTypes.number,
  periodicityText: PropTypes.string,
  isRecurring: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClickPrevPage: PropTypes.func,
  ...ReduxFormPropTypes,
};

StepSelectAccount.defaultProps = {
  amount: 0,
  periodicityText: '',
  isRecurring: false,
  onSubmit: Function.prototype,
  onClickPrevPage: Function.prototype,
};

export default reduxForm({
  form: 'funding-deposit-form',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(StepSelectAccount);
