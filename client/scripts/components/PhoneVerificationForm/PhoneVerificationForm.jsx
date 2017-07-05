import React, { PropTypes } from 'react';
import { Field as ReduxField, reduxForm } from 'redux-form';

import classNames from 'classnames/bind';

import validate from './validate';

import { Button, Field, SubHeading, TextLink } from '../UI';

import styles from './PhoneVerificationForm.css';

const cx = classNames.bind(styles);

const renderField = ({ input, meta: { touched, error, active }, type, label, className }) => {
  const isError = touched && error && !active;

  return (
    <Field
      type={type}
      label={label}
      className={className}
      errorText={isError && error}
      {...input}
    />
  );
};

const PhoneVerificationForm = ({
  onSubmit,
  onClickSendAgain,
  onHide,
  isLoading,
  handleSubmit,
  pristine,
  submitting,
  valid,
}) => (
  <form onSubmit={handleSubmit(onSubmit)} className={cx('PhoneVerificationForm')}>
    <SubHeading text="Verify your phone number" />
    <p>
      Please enter the code sent to your phone.
    </p>
    <div className={cx('Row')}>
      <ReduxField
        name="code"
        component={renderField}
        type="text"
        className={cx('Field')}
      />
    </div>
    <div className={cx('RowRight')}>
      <Button
        label="Verify"
        icon="arrow-right"
        iconAlign="right"
        isDisabled={pristine || submitting || !valid}
        isLoading={isLoading}
      />
    </div>
    <div className={cx('RowCenter')}>
      <Button
        label="I’ll do this later"
        kind="link"
        icon="arrow-left"
        iconAlign="left"
        onClick={onHide}
      />
    </div>
    <div className={cx('RowCenterWithText')}>
      <div className={cx('Text')}>
        Didn’t receive the text message?&nbsp;
        <TextLink text="Send again." onClick={onClickSendAgain} />
      </div>
    </div>
  </form>
);

PhoneVerificationForm.displayName = 'PhoneVerificationForm';

PhoneVerificationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClickSendAgain: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};

PhoneVerificationForm.defaultProps = {
  onSubmit: Function.prototype,
  onClickSendAgain: Function.prototype,
};

export default reduxForm({
  form: 'phone-verification',
  validate,
})(PhoneVerificationForm);
