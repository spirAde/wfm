import React, { PropTypes } from 'react';
import { Field as ReduxField, reduxForm } from 'redux-form';

import classNames from 'classnames/bind';

import validate from './validate';

import { Button, Field } from '../UI';

import styles from './ResetPasswordForm.css';

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

const ResetPasswordForm = ({ onSubmit, isLoading, handleSubmit, pristine, submitting, valid }) => (
  <form onSubmit={handleSubmit(onSubmit)} className={cx('ResetPasswordForm')}>
    <div>
      <p className={cx('Instruction')}>
        We’ll send you instructions to reset your password. Enter your email below.
      </p>
    </div>
    <div className={cx('Field')}>
      <ReduxField name="email" component={renderField} type="email" label="Email Address" />
    </div>
    <div className={cx('SendButton')}>
      <Button
        label="Send"
        icon="arrow-right"
        iconAlign="right"
        isDisabled={pristine || submitting || !valid}
        isLoading={isLoading}
      />
    </div>
  </form>
);

ResetPasswordForm.displayName = 'ResetPasswordForm';

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'reset-password',
  validate,
})(ResetPasswordForm);
