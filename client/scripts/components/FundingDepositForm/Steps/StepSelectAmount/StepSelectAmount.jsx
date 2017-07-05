import React, { PropTypes } from 'react';
import { Field as ReduxFormField, reduxForm, propTypes as ReduxFormPropTypes } from 'redux-form';

import classNames from 'classnames/bind';

import { Button, Field, Heading, Checkbox } from '../../../UI';
import validate from '../../validate';
import { periodicityOptions, dayOptions } from '../../../../utils/options';

import styles from './StepSelectAmount.css';

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

const renderCheckboxField = ({
  input,
  label,
  className,
  checked,
}) => (
  <Checkbox
    className={className}
    label={label}
    checked={checked}
    {...input}
  />
);

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

const StepSelectAmount = ({
  onSubmit,
  submitting,
  valid,
  isRecurring,
  periodicity,
}) => (
  <form className={cx('StepSelectAmount')}>
    <Heading text="Fund your account" />
    <div className={cx('Row')}>
      <ReduxFormField
        name="amount"
        component={renderInputField}
        type="currency"
        label="How much do you want to fund?"
      />
      <ReduxFormField
        className={cx('ScheduledCheckbox')}
        component={renderCheckboxField}
        label="Set this up as a scheduled event"
        name="isRecurring"
        checked={isRecurring}
      />
    </div>
    {
      isRecurring &&
      <div className={cx('Row')}>
        <ReduxFormField
          name="periodicity"
          component={renderSelectField}
          label="How often?"
          options={periodicityOptions}
        />
        <ReduxFormField
          name="day"
          component={renderSelectField}
          label="What day?"
          options={dayOptions[periodicity]}
        />
      </div>
    }
    <div className={cx('Row')}>
      <Button
        label="Continue"
        icon="arrow-right"
        iconAlign="right"
        isDisabled={submitting || !valid}
        onClick={onSubmit}
        className={cx('Button')}
      />
    </div>
  </form>
);

StepSelectAmount.displayName = 'StepSelectAmount';

StepSelectAmount.propTypes = {
  bankIsLoading: PropTypes.bool,
  isRecurring: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  ...ReduxFormPropTypes,
};

StepSelectAmount.defaultProps = {
  bankIsLoading: false,
  isRecurring: false,
};

export default reduxForm({
  form: 'funding-deposit-form',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(StepSelectAmount);
