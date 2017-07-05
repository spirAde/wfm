import React, { PropTypes } from 'react';
import { Field as ReduxFormField, reduxForm, propTypes as ReduxFormPropTypes } from 'redux-form';

import classNames from 'classnames/bind';

import isEmpty from 'lodash/isEmpty';

import { Button, RadioGroup, Radio, Field, Label } from '../UI';

import styles from './AccountsForm.css';

const cx = classNames.bind(styles);

const validate = ({ plaidAmount, typeOfAccount }) => {
  const errors = {};

  if (!plaidAmount) {
    errors.plaidAmount = 'Required.';
  } else if (plaidAmount && parseInt(plaidAmount, 10) < 50) {
    errors.plaidAmount = 'Minimum amount is $50. Please double check your initial funding amount.';
  }

  if (!typeOfAccount) {
    errors.typeOfAccount = 'Required.';
  }

  // Sorry, your account balance is too low. Change your funding amount

  return errors;
};

const renderInputField = ({
  input,
  meta: { touched, error, active },
  name,
  type,
  label,
  ...otherProps
}) => {
  const isError = touched && error && !active;

  return (
    <Field
      name={name}
      type={type}
      label={label}
      errorText={isError && error}
      {...input}
      {...otherProps}
    />
  );
};

const renderRadioGroupField = ({ input, className, children }) => (
  <RadioGroup {...input} className={className}>
    {children}
  </RadioGroup>
);

const AccountsForm = ({
  onSubmit,
  onClickBack,
  isLoading,
  handleSubmit,
  pristine,
  submitting,
  valid,
  initialValues,
}) => {
  const nextButtonIsDisabled = isEmpty(initialValues)
    ? pristine || submitting || !valid
    : submitting || !valid;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cx('AccountsForm')}>
      <div>
        <ReduxFormField
          name="plaidAmount"
          component={renderInputField}
          type="currency"
          label="How much do you want to start your WorthFM account with?"
        />
      </div>
      <div>
        <Label text="What type of account is this?" />
        <ReduxFormField
          name="typeOfAccount"
          component={renderRadioGroupField}
          className={cx('RadioGroup')}
        >
          <Radio
            name="savings"
            label="Plaid Savings"
            className={cx('Radio')}
          >
            <span className={cx('Amount')}>$1,203.42</span>
          </Radio>
          <Radio
            name="checking"
            label="Plaid Checking"
            className={cx('Radio')}
          >
            <span className={cx('Amount')}>$1,081.78</span>
          </Radio>
          <Radio
            name="premierChecking"
            label="Plaid Premier Checking"
            className={cx('Radio')}
          >
            <span className={cx('Amount')}>$7,205.23</span>
          </Radio>
        </ReduxFormField>
      </div>
      <div className={cx('Total')}>
        <div className={cx('Text')}>
          Total
        </div>
        <div className={cx('TotalAmount')}>
          $9,490.43
        </div>
      </div>
      <div className={cx('Buttons')}>
        <Button
          kind="link"
          icon="arrow-left"
          iconAlign="left"
          label="Go Back"
          onClick={onClickBack}
        />
        <Button
          label="Next"
          icon="arrow-right"
          iconAlign="right"
          isDisabled={nextButtonIsDisabled}
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};

AccountsForm.displayName = 'AccountsForm';

AccountsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  ...ReduxFormPropTypes,
};

export default reduxForm({
  form: 'accounts',
  validate,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  enableReinitialize: false,
})(AccountsForm);
