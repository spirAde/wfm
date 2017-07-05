import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import moment from 'moment';

import DatePicker from 'react-datepicker';

import InputText from '../InputText/InputText';

import '../../../../../../node_modules/react-datepicker/dist/react-datepicker-cssmodules.css';

import styles from './InputDatepicker.css';

const cx = classNames.bind(styles);

const InputDatepicker = ({
  startDate,
  endDate,
  minDate,
  maxDate,
  selected,
  placeholderText,
  className,
  inputClassName,
  value,
  ...otherProps,
}) => (
  <DatePicker
    dateFormat="MM/DD/YYYY"
    startDate={startDate}
    endDate={endDate}
    minDate={minDate}
    maxDate={maxDate}
    selected={selected || (value ? moment(value) : undefined)}
    placeholderText={placeholderText}
    className={cx('InputDatepicker', className)}
    customInput={
      <InputText
        icon="calendar"
        iconAlign="right"
        inputClassName={inputClassName}
      />
    }
    {...otherProps}
  />
);

InputDatepicker.displayName = 'InputDatepicker';

InputDatepicker.propTypes = {
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  dateFormat: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  selected: PropTypes.object,
  placeholderText: PropTypes.string,
};

InputDatepicker.defaultProps = {
  className: '',
  inputClassName: '',
  dateFormat: 'MM/DD/YYYY',
  startDate: undefined,
  endDate: undefined,
  minDate: undefined,
  maxDate: undefined,
  selected: undefined,
  placeholderText: '',
};

export default InputDatepicker;
