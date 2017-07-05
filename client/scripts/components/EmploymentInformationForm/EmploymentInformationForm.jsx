import React, { PropTypes, Component } from 'react';
import { Field as ReduxFormField, reduxForm, propTypes as ReduxFormPropTypes } from 'redux-form';
import shallowCompare from 'react-addons-shallow-compare';

import classNames from 'classnames/bind';

import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';

import validate from './validate';

import { Button, Field } from '../UI';

import styles from './EmploymentInformationForm.css';

import { employmentOptions } from '../../utils/options';

const cx = classNames.bind(styles);

const renderSelectField = ({
  input,
  meta: { touched, error, active },
  label,
  className,
  onChangeEnhancer,
  options,
}) => {
  const isError = touched && error && !active;

  return (
    <Field
      type="select"
      label={label}
      className={className}
      errorText={isError && error}
      options={options}
      placeholder="Choose one"
      {...input}
      onChange={(value) => {
        onChangeEnhancer(value);
        input.onChange(value);
      }}
    />
  );
};

const renderInputField = ({
  input,
  meta: { touched, error, active },
  label,
  type,
  className,
  ...otherProps
}) => {
  const isError = touched && error && !active;

  return (
    <Field
      label={label}
      className={className}
      type={type}
      errorText={isError && error}
      {...input}
      {...otherProps}
    />
  );
};

class EmploymentInformationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedType: props.initialValues.employment || undefined,
    };

    this.handleChangeType = this.handleChangeType.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleChangeType(value) {
    const opposites = {
      employed: 'unemployed',
      selfEmployed: 'unemployed',
      unemployed: 'employed',
      student: 'employed',
      retired: 'employed',
    };

    if (this.state.selectedType !== value) {
      this.props.reset();

      // ugly hack, because for employed and self-employed we have same fields(unemployed,
      // student, retired too). And by this reason redux-form doesn't reset them.
      // But if check opposite type(type which have another fields) redux-form update
      // fields(validate works again).
      this.setState({
        selectedType: opposites[value],
      }, () => this.setState({ selectedType: value }));
    }
  }

  renderEmploymentFieldsByType() {
    const { selectedType } = this.state;

    if (!selectedType) return null;

    const type = find(employmentOptions, option => option.value === selectedType) || {};
    const fields = type.fields || [];

    return fields.map(field => (
      <div className={cx('Row')} key={`${selectedType}-${field.name}`}>
        <ReduxFormField
          name={field.name}
          component={renderInputField}
          type={field.type}
          label={field.label}
          className={cx('Field')}
        />
      </div>
    ));
  }

  render() {
    const {
      pristine,
      submitting,
      valid,
      isLoading,
      handleSubmit,
      onSubmit,
      onClickBack,
      initialValues,
    } = this.props;

    const renderedFields = this.renderEmploymentFieldsByType();

    const nextButtonIsDisabled = isEmpty(initialValues)
      ? pristine || submitting || !valid
      : submitting || !valid;

    return (
      <form onSubmit={handleSubmit(onSubmit)} className={cx('EmploymentInformationForm')}>
        <div className={cx('Row')}>
          <ReduxFormField
            name="employment"
            component={renderSelectField}
            type="select"
            label="What is your employment status?"
            className={cx('Field')}
            onChangeEnhancer={this.handleChangeType}
            options={employmentOptions}
          />
        </div>
        {renderedFields}
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
  }
}

EmploymentInformationForm.displayName = 'EmploymentInformationForm';

EmploymentInformationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClickBack: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  ...ReduxFormPropTypes,
};

export default reduxForm({
  form: 'employment-information',
  validate,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  enableReinitialize: false,
})(EmploymentInformationForm);
