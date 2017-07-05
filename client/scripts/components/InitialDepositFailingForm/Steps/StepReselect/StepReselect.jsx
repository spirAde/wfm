import React, { PropTypes } from 'react';
import { Field as ReduxFormField, reduxForm, propTypes as ReduxFormPropTypes } from 'redux-form';
import classNames from 'classnames/bind';

import numeral from 'numeral';

import { accountOptions } from '../../../../utils/options';

import { Field, Button, Heading } from '../../../UI';

import validate from '../../validate';

import styles from './StepReselect.css';

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

const StepReselect = ({ initialDeposit, balance, handleSubmit, onSubmit, submitting, valid }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cx('StepReselect')}>
      <Heading text="We could not add requested funds to your account" />
      <p>
        We paused funding to prevent any overdraft charges or bank fees.
      </p>
      <div className={cx('Row')}>
        <Field type="static">
          Original fund request:<br />
          {numeral(initialDeposit).format('$0,0.00')}
        </Field>
        <Field type="static">
          Amount available:<br />
          {numeral(balance).format('$0,0.00')}
        </Field>
      </div>
      <div className={cx('Row')}>
        <ReduxFormField
          name="amount"
          component={renderInputField}
          type="currency"
          label="Amount to Fund:"
        />
        <ReduxFormField
          name="account"
          component={renderSelectField}
          label="Account to Fund:"
          options={accountOptions}
        />
      </div>
      <div className={cx('Row')}>
        <Button
          label="Submit"
          icon="arrow-right"
          iconAlign="right"
          isDisabled={submitting || !valid}
          isLoading={submitting}
          className={cx('Button')}
        />
      </div>
    </form>
  );
};

StepReselect.displayName = 'StepReselect';

StepReselect.propTypes = {
  ...ReduxFormPropTypes,
  initialDeposit: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  balance: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

StepReselect.defaultProps = {};

export default reduxForm({
  form: 'initial-deposit-failing-form',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(StepReselect);
