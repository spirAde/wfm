import React, { PropTypes } from 'react';
import { Field as ReduxField, reduxForm, propTypes as ReduxPropTypes } from 'redux-form';

import classNames from 'classnames/bind';

import validate from './validate';

import { Button, Field } from '../UI';

import styles from './SignUpForm.css';

const cx = classNames.bind(styles);

const renderField = ({ input, meta: { touched, error, active }, name, type, label }) => {
  const isError = touched && error && !active;

  return (
    <Field
      type={type}
      label={label}
      errorText={isError && error}
      {...input}
    />
  );
};

const SignUpForm = ({
  onSubmit,
  isLoading,
  handleSubmit,
  pristine,
  submitting,
  valid,
}) => (
  <form onSubmit={handleSubmit(onSubmit)} className={cx('SignUpForm')}>
    <div className={cx('Field')}>
      <ReduxField name="firstName" component={renderField} type="text" label="First Name" />
    </div>
    <div className={cx('Field')}>
      <ReduxField name="lastName" component={renderField} type="text" label="Last Name" />
    </div>
    <div className={cx('Field')}>
      <ReduxField name="email" component={renderField} type="email" label="Email Address" />
    </div>
    <div className={cx('Field')}>
      <ReduxField name="pwd" component={renderField} type="password" label="Create Password" />
      <p>
        8 characters, including 1 number and 1 uppercase letter
      </p>
    </div>
    <div className={cx('Field')}>
      <ReduxField name="confirmPwd" component={renderField} type="password" label="Confirm Password" />
    </div>
    <div className={cx('Buttons')}>
      <Button
        label="Sign Up"
        icon="arrow-right"
        iconAlign="right"
        isDisabled={pristine || submitting || !valid}
        isLoading={isLoading}
      />
    </div>
  </form>
);

SignUpForm.displayName = 'SignUpForm';

SignUpForm.propTypes = {
  ...ReduxPropTypes,
  onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'signup',
  validate,
})(SignUpForm);
