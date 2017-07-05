import React, { PropTypes } from 'react';
import { Field as ReduxFormField, reduxForm, propTypes as ReduxFormPropTypes } from 'redux-form';

import classNames from 'classnames/bind';

import { Button, Field, Heading, TextLink } from '../../../UI';
import validate from '../../validate';
import { accountOptions, periodicityOptions, dayOptions } from '../../../../utils/options';

import styles from './StepEditingGroup.css';

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

const StepEditingGroup = ({
  handleSubmit,
  onSubmit,
  submitting,
  valid,
  periodicity,
  onClickFinish,
  onClickCancel,
}) => (
  <form onSubmit={handleSubmit(onSubmit)} className={cx('StepEditingGroup')}>
    <Heading text="Edit Schedule" />
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
    <div className={cx('RowButtons')}>
      <Button
        label="Update"
        icon="arrow-right"
        iconAlign="right"
        isLoading={submitting}
        isDisabled={submitting || !valid}
      />
      <TextLink
        text="Cancel this schedule"
        onClick={onClickCancel}
        className={cx('TextLink')}
      />
    </div>
    <div className={cx('RowButtons')}>
      <Button
        label="Cancel"
        icon="arrow-left"
        iconAlign="left"
        kind="link"
        onClick={onClickFinish}
      />
    </div>
  </form>
);

StepEditingGroup.displayName = 'StepEditingGroup';

StepEditingGroup.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClickFinish: PropTypes.func.isRequired,
  ...ReduxFormPropTypes,
};

StepEditingGroup.defaultProps = {
  onClickFinish: Function.prototype,
};

export default reduxForm({
  form: 'recurring-editing-group-form',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(StepEditingGroup);
