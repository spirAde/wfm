import React, { PropTypes } from 'react';
import { Field as ReduxFormField, reduxForm, propTypes as ReduxFormPropTypes } from 'redux-form';

import classNames from 'classnames/bind';

import validate from './validate';

import { Button, Field, TextLink } from '../UI';

import styles from './SignInForm.css';

const cx = classNames.bind(styles);

const renderField = ({ input, meta: { touched, error, active }, name, type, label }) => {
  const isError = touched && error && !active;

  return (
    <Field
      name={name}
      type={type}
      label={label}
      errorText={isError && error}
      {...input}
    />
  );
};

const SignInForm = ({ onSubmit, isLoading, handleSubmit, pristine, submitting, valid }) => (
  <form onSubmit={handleSubmit(onSubmit)} className={cx('SignInForm')}>
    <div className={cx('Field')}>
      <ReduxFormField name="email" component={renderField} type="email" label="Email Address" />
    </div>
    <div className={cx('Field')}>
      <ReduxFormField name="pwd" component={renderField} type="password" label="Password" />
    </div>
    <div className={cx('Buttons')}>
      <TextLink text="Forgot password?" to="/reset" className={cx('ForgotPassword')} />
      <Button
        label="Sign In"
        icon="arrow-right"
        iconAlign="right"
        isDisabled={pristine || submitting || !valid}
        isLoading={isLoading}
      />
    </div>
  </form>
);

SignInForm.displayName = 'SignInForm';

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  ...ReduxFormPropTypes,
};

export default reduxForm({
  form: 'signin',
  validate,
})(SignInForm);
