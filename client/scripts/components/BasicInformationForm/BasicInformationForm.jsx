import React, { PropTypes } from 'react';
import { Field as ReduxFormField, reduxForm, propTypes as ReduxFormPropTypes } from 'redux-form';

import classNames from 'classnames/bind';

import isEmpty from 'lodash/isEmpty';

import { Button, Field } from '../UI';

import validate from './validate';

import styles from './BasicInformationForm.css';

import { stateOptions } from '../../utils/options';

const cx = classNames.bind(styles);

const renderInputField = ({
  input,
  meta: { touched, error, active },
  label,
  className,
  children,
  ...otherProps
}) => {
  const isError = touched && error && !active;

  return (
    <Field
      label={label}
      className={className}
      errorText={isError && error}
      {...input}
      {...otherProps}
    >
      {children}
    </Field>
  );
};

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
      placeholder="Select State"
      label={label}
      className={className}
      options={options}
      errorText={isError && error}
      {...input}
    />
  );
};

const BasicInformationForm = ({
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
    <form onSubmit={handleSubmit(onSubmit)} className={cx('BasicInformationForm')}>
      <div className={cx('Row')}>
        <ReduxFormField
          name="firstName"
          component={renderInputField}
          type="text"
          label="First Name"
          className={cx('FirstName')}
        />
        <ReduxFormField
          name="lastName"
          component={renderInputField}
          label="Last Name"
          className={cx('LastName')}
        />
      </div>
      <div className={cx('Row')}>
        <ReduxFormField
          name="address"
          component={renderInputField}
          label="Street Address"
          className={cx('Address')}
        >
          <span className={cx('Instruction')}>
            Please use your street address to sign up.
            If you would like to use a PO Box for a mailing address you may
            add it from your Profile page once you’ve set up your account.
          </span>
        </ReduxFormField>
      </div>
      <div className={cx('Row')}>
        <ReduxFormField
          name="city"
          component={renderInputField}
          label="City"
          className={cx('City')}
        />
        <ReduxFormField
          name="state"
          component={renderSelectField}
          label="State"
          className={cx('State')}
          options={stateOptions}
        />
        <ReduxFormField
          name="zipCode"
          component={renderInputField}
          label="Zip Code"
          type="number"
          pattern="zipCode"
          className={cx('ZipCode')}
          inputClassName={cx('ZipCode')}
        />
      </div>
      <div className={cx('Row')}>
        <ReduxFormField
          name="birthDate"
          component={renderInputField}
          label="Date of Birth"
          type="number"
          placeholder="MM/DD/YYYY"
          pattern="date"
          className={cx('BirthDate')}
          inputClassName={cx('BirthDate')}
        />
      </div>
      <div className={cx('Row')}>
        <ReduxFormField
          name="phone"
          component={renderInputField}
          label="Mobile Phone Number"
          type="number"
          placeholder="XXX-XXX-XXXX"
          pattern="phone"
          className={cx('Phone')}
          inputClassName={cx('Phone')}
        />
        <div className={cx('ConfirmationText')}>
          We’ll send you a confirmation text.
        </div>
      </div>
      <div className={cx('Row')}>
        <ReduxFormField
          name="ssn"
          component={renderInputField}
          label="Social Security Number"
          type="ssn"
          placeholder="XXX-XX-XXXX"
          pattern="ssn"
          className={cx('SSN')}
          inputClassName={cx('SSN')}
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

BasicInformationForm.displayName = 'BasicInformationForm';

BasicInformationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClickBack: PropTypes.func.isRequired,
  initialValues: PropTypes.objectOf(PropTypes.string),
  ...ReduxFormPropTypes,
};

BasicInformationForm.defaultProps = {
  initialValues: {},
};

export default reduxForm({
  form: 'basic-information',
  validate,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  enableReinitialize: false,
})(BasicInformationForm);
