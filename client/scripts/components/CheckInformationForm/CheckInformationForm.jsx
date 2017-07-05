import React, { PropTypes } from 'react';
import { Field as ReduxFormField, reduxForm, propTypes as ReduxFormPropTypes } from 'redux-form';

import classNames from 'classnames/bind';

import isEmpty from 'lodash/isEmpty';

import validate from './validate';

import { Button, RadioGroup, Radio, Field, Label } from '../UI';

import styles from './CheckInformationForm.css';

const cx = classNames.bind(styles);

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

const CheckInformationForm = ({
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
    <form onSubmit={handleSubmit(onSubmit)} className={cx('CheckInformationForm')}>
      <div>
        <ReduxFormField
          name="bankName"
          component={renderInputField}
          type="text"
          label="Bank Name"
        />
      </div>
      <div className={cx('ActionType')}>
        <Label text="What type of account is this?" />
        <ReduxFormField
          name="typeOfAccount"
          component={renderRadioGroupField}
          className={cx('RadioGroup')}
        >
          <Radio
            name="savings"
            label="Savings"
            className={cx('Radio')}
          />
          <Radio
            name="checking"
            label="Checking"
            className={cx('Radio')}
          />
        </ReduxFormField>
      </div>
      <div>
        <ReduxFormField
          name="transitRouting"
          component={renderInputField}
          type="number"
          pattern="bankRoutingNumber"
          label="Routing Number"
        />
      </div>
      <div>
        <ReduxFormField
          name="bankAccount"
          component={renderInputField}
          type="number"
          pattern="bankAccountNumber"
          label="Account Number"
        />
      </div>
      <div>
        <ReduxFormField
          name="amountOfTransaction"
          component={renderInputField}
          type="currency"
          label="How much do you want to put into your WorthFM account to start?"
        />
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

CheckInformationForm.displayName = 'CheckInformationForm';

CheckInformationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClickBack: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  ...ReduxFormPropTypes,
};

export default reduxForm({
  form: 'check-information',
  validate,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  enableReinitialize: false,
})(CheckInformationForm);
