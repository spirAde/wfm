import React, { PropTypes } from 'react';
import { Field as ReduxFormField, reduxForm, propTypes as ReduxFormPropTypes } from 'redux-form';

import classNames from 'classnames/bind';

import { Button, Field, Heading, Spinner } from '../../../UI';
import validate from '../../validate';
import { accountOptions } from '../../../../utils/options';

import styles from './StepSelectAccount.css';

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
  submitting,
  valid,
  bankIsLoading,
}) => (
  <form className={cx('StepSelectAccount')}>
    <Heading text="Withdraw funds" />
    <div className={cx('Row')}>
      <ReduxFormField
        name="amount"
        component={renderInputField}
        type="currency"
        label="How much do you want to withdraw?"
      />
    </div>
    <div className={cx('Row')}>
      <ReduxFormField
        name="account"
        component={renderSelectField}
        label="From:"
        options={accountOptions}
      />
      <Field label="To:" type="static">
        {
          bankIsLoading
          ? <Spinner size="xs" center className={cx('Spinner')} />
          : <div className={cx('Bank')}>BANK OF AMERICA, N.A. (3905)</div>
        }
      </Field>
    </div>
    <div className={cx('Row')}>
      <Button
        label="Continue"
        icon="arrow-right"
        iconAlign="right"
        className={cx('Button')}
        isDisabled={submitting || !valid}
        onClick={onSubmit}
      />
    </div>
  </form>
);

StepSelectAccount.displayName = 'StepSelectAccount';

StepSelectAccount.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  ...ReduxFormPropTypes,
};

StepSelectAccount.defaultProps = {};

export default reduxForm({
  form: 'funding-withdraw-form',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(StepSelectAccount);
