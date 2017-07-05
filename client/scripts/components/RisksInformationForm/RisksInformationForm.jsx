import React, { PropTypes } from 'react';
import { Field as ReduxFormField, reduxForm, propTypes as ReduxFormPropTypes } from 'redux-form';

import classNames from 'classnames/bind';

import isEmpty from 'lodash/isEmpty';

import { Button, RadioGroup, Radio } from '../UI';

import styles from './RisksInformationForm.css';

const cx = classNames.bind(styles);

const renderRadioGroupField = ({ input, children }) => (
  <RadioGroup {...input}>
    {children}
  </RadioGroup>
);

const RisksInformationForm = ({
  onSubmit,
  onClickBack,
  isLoading,
  handleSubmit,
  pristine,
  submitting,
  valid,
  initialValues,
}) => {
  const nextButtonIsDisabled = isEmpty(initialValues)
    ? pristine || submitting || !valid
    : submitting || !valid;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cx('RisksInformationForm')}>
      <div>
        <ReduxFormField component={renderRadioGroupField} name="risk">
          <Radio
            value="option-0"
            label="Panic. I’d likely sell everything in my portfolio."
            className={cx('Radio')}
          />
          <Radio
            value="option-1"
            label="Feel ill, but I’d wait it out. I understand stocks can fluctuate in value."
            className={cx('Radio')}
          />
          <Radio
            value="option-2"
            label="Investigate further. This may even be an opportunity to invest more at lower prices."
            className={cx('Radio')}
          />
          <Radio
            value="option-3"
            label="I don't know how I'd feel or what I would do since I don't know enough about investing."
            className={cx('Radio')}
          />
        </ReduxFormField>
      </div>
      <div className={cx('Buttons')}>
        <Button
          kind="link"
          icon="arrow-left"
          iconAlign="left"
          label="Go Back"
          onClick={onClickBack}
        />
        <Button
          label="Next"
          icon="arrow-right"
          iconAlign="right"
          isDisabled={nextButtonIsDisabled}
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};

RisksInformationForm.displayName = 'RisksInformationForm';

RisksInformationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClickBack: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  ...ReduxFormPropTypes,
};

RisksInformationForm.defaultProps = {
  isLoading: false,
};

export default reduxForm({
  form: 'risks-information',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  enableReinitialize: false,
})(RisksInformationForm);
