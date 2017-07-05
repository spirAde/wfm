import React, { PropTypes } from 'react';
import { Field as ReduxFormField, reduxForm, propTypes as ReduxFormPropTypes } from 'redux-form';

import classNames from 'classnames/bind';

import { Button, Field, Heading } from '../../../UI';
import validate from '../../validate';
import { accountOptions, periodicityOptions, dayOptions } from '../../../../utils/options';

import styles from './StepCreatingGroup.css';

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

const StepCreatingGroup = ({
  handleSubmit,
  onSubmit,
  submitting,
  valid,
  periodicity,
  onClickFinish,
}) => (
  <form onSubmit={handleSubmit(onSubmit)} className={cx('StepCreatingGroup')}>
    <Heading text="Schedule a transfer" />
    <div className={cx('Row')}>
      <ReduxFormField
        name="amount"
        component={renderInputField}
        type="currency"
        label="Amount"
      />
      <Field
        type="static"
        label="From:"
        className={cx('BankField')}
      >
        <div className={cx('Bank')}>BANK OF AMERICA, N.A. (3905)</div>
      </Field>
      <ReduxFormField
        name="account"
        component={renderSelectField}
        label="To:"
        options={accountOptions}
      />
    </div>
    <div className={cx('Row')}>
      <ReduxFormField
        name="periodicity"
        component={renderSelectField}
        label="How often?"
        options={periodicityOptions}
        className={cx('Periodicity')}
      />
      <ReduxFormField
        name="day"
        component={renderSelectField}
        label="What day?"
        options={dayOptions[periodicity]}
        className={cx('Day')}
      />
    </div>
    <div className={cx('Row')}>
      <Button
        label="Schedule"
        icon="arrow-right"
        iconAlign="right"
        className={cx('Button')}
        isLoading={submitting}
        isDisabled={submitting || !valid}
      />
    </div>
    <div className={cx('Row')}>
      <Button
        label="Cancel"
        icon="arrow-left"
        iconAlign="left"
        kind="link"
        className={cx('Button')}
        onClick={onClickFinish}
      />
    </div>
  </form>
);

StepCreatingGroup.displayName = 'StepCreatingGroup';

StepCreatingGroup.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClickFinish: PropTypes.func.isRequired,
  ...ReduxFormPropTypes,
};

StepCreatingGroup.defaultProps = {
  onClickFinish: Function.prototype,
};

export default reduxForm({
  form: 'recurring-creating-group-form',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(StepCreatingGroup);
