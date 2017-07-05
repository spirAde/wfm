import React, { PropTypes } from 'react';
import { Field as ReduxFormField, reduxForm, propTypes as ReduxFormPropTypes } from 'redux-form';

import classNames from 'classnames/bind';

import numeral from 'numeral';

import { Button, Heading, InputCurrency, RadioGroup, Radio, TextLink } from '../../../UI';
import validate from '../../validate';

import styles from './StepSelectPrevAmount.css';

const cx = classNames.bind(styles);

const renderRadioGroupField = ({ input, children }) => (
  <RadioGroup {...input}>
    {children}
  </RadioGroup>
);

const renderInputField = ({
  input,
  meta: { touched, error, active },
  label,
}) => {
  const isError = touched && error && !active;

  return (
    <InputCurrency
      label={label}
      errorText={isError && error}
      {...input}
    />
  );
};

const StepSelectPrevAmount = ({
  onSubmit,
  onClickFAQ,
  submitting,
  valid,
  limit,
  year,
}) => (
  <form className={cx('StepSelectPrevAmount')}>
    <Heading text="Activate your retirement account" />
    <p>
      Your WorthFM Retirement Account will be a Traditional IRA.
    </p>
    <p>
      You can contribute a total of {numeral(limit).format('$0,0.00')} per year to any IRA(s) you may have.
      We will make sure you do not over-contribute and face tax consequences.
    </p>
    <p>
      Have you already contributed to an IRA in {year}?
    </p>
    <div className={cx('Row')}>
      <ReduxFormField component={renderRadioGroupField} name="existPrevAmount">
        <Radio
          value={true}
          label="Yes, I have contributed:"
          transform="30%"
          className={cx('Radio')}
        >
          <ReduxFormField
            component={renderInputField}
            name="prevAmount"
          />
        </Radio>
        <Radio
          value={false}
          label={`No, I have not contributed to an IRA in ${year}`}
        />
      </ReduxFormField>
    </div>
    <div className={cx('RowButtons')}>
      <Button
        label="Continue"
        icon="arrow-right"
        iconAlign="right"
        onClick={onSubmit}
        isDisabled={submitting || !valid}
        className={cx('Button')}
      />
      <TextLink
        text="Commonly asked questions about IRAs"
        onClick={onClickFAQ}
        className={cx('TextLink')}
      />
    </div>
    <div className={cx('RowButtons')}>
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

StepSelectPrevAmount.displayName = 'StepSelectPrevAmount';

StepSelectPrevAmount.propTypes = {
  year: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  limit: PropTypes.oneOf([5500, 6500]),
  onSubmit: PropTypes.func.isRequired,
  onClickFAQ: PropTypes.func.isRequired,
  ...ReduxFormPropTypes,
};

StepSelectPrevAmount.defaultProps = {
  year: undefined,
  limit: undefined,
  onClickFAQ: Function.prototype,
};

export default reduxForm({
  form: 'activation-retirement-form',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(StepSelectPrevAmount);
