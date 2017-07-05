import React, { PropTypes } from 'react';
import { Field as ReduxFormField, reduxForm, propTypes as ReduxFormPropTypes } from 'redux-form';

import classNames from 'classnames/bind';

import capitalize from 'lodash/capitalize';

import { Button, Field, Heading, TextLink } from '../../../UI';
import validate from '../../validate';

import styles from './StepEditingItem.css';

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

const StepEditingItem = ({
  handleSubmit,
  onSubmit,
  submitting,
  valid,
  accountType,
  bank,
  onClickFinish,
  onClickCancel,
}) => (
  <form onSubmit={handleSubmit(onSubmit)} className={cx('StepEditingItem')}>
    <Heading text="Edit Transfer" />
    <div className={cx('Row')}>
      <ReduxFormField
        name="amount"
        component={renderInputField}
        type="currency"
        label="Amount:"
      />
      <ReduxFormField
        name="date"
        component={renderInputField}
        type="datepicker"
        label="When:"
      />
    </div>
    <div className={cx('Row')}>
      <Field
        type="static"
        label="From:"
      >
        <div>{bank}</div>
      </Field>
      <Field
        type="static"
        label="To:"
      >
        <div>{capitalize(accountType)} Account</div>
      </Field>
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
        text="Cancel this transfer"
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

StepEditingItem.displayName = 'StepEditingItem';

StepEditingItem.propTypes = {
  account: PropTypes.string,
  bank: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onClickFinish: PropTypes.func.isRequired,
  ...ReduxFormPropTypes,
};

StepEditingItem.defaultProps = {
  account: undefined,
  bank: undefined,
  onClickFinish: Function.prototype,
};

export default reduxForm({
  form: 'recurring-editing-item-form',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(StepEditingItem);
