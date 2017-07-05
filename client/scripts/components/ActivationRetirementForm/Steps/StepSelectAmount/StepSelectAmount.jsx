import React, { PropTypes } from 'react';
import { Field as ReduxFormField, reduxForm, propTypes as ReduxFormPropTypes } from 'redux-form';

import classNames from 'classnames/bind';

import numeral from 'numeral';

import { Button, Heading, Field, Spinner } from '../../../UI';
import validate from '../../validate';

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

const StepSelectAmount = ({
  onSubmit,
  submitting,
  valid,
  limit,
  year,
  bankIsLoading,
  prevAmount,
}) => {
  const residue = numeral(limit - prevAmount).format('$0,0.00');

  return (
    <form className={cx('StepSelectAmount')}>
      <Heading text="Activate your retirement account" />
      <p>
        Since you haven’t yet contributed this year, you can contribute {residue} to
        your IRA(s) before you hit the limit for {year}.
      </p>
      <div className={cx('Row')}>
        <Field
          type="static"
          label="From:"
        >
          {
            bankIsLoading
              ? <Spinner size="xs" center className={cx('Spinner')} />
              : <div>BANK OF AMERICA, N.A. (3905)</div>
          }
        </Field>
      </div>
      <div className={cx('Row')}>
        <ReduxFormField
          name="amount"
          component={renderInputField}
          type="currency"
          label="How much do you want to contribute now?"
        />
      </div>
      <div className={cx('RowButton')}>
        <Button
          label="Continue"
          icon="arrow-right"
          iconAlign="right"
          onClick={onSubmit}
          isDisabled={submitting || !valid}
          className={cx('Button')}
        />
      </div>
      <div className={cx('RowButton')}>
        <Button
          label="I’ll contribute later"
          kind="link"
          icon="arrow-left"
          iconAlign="left"
          to="/dashboard"
        />
      </div>
    </form>
  );
};

StepSelectAmount.displayName = 'StepSelectAmount';

StepSelectAmount.propTypes = {
  year: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  prevAmount: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
  ...ReduxFormPropTypes,
};

StepSelectAmount.defaultProps = {
  year: undefined,
  prevAmount: 0,
};

export default reduxForm({
  form: 'activation-retirement-form',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(StepSelectAmount);
