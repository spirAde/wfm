import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import { matchStrict } from '../../../utils/match';

import Label from '../Label/Label';
import InputText from '../Input/InputText/InputText';
import InputNumber from '../Input/InputNumber/InputNumber';
import InputDatepicker from '../Input/InputDatepicker/InputDatepicker';
import InputCurrency from '../Input/InputCurrency/InputCurrency';
import InputSearch from '../Input/InputSearch/InputSearch';
import Select from '../Select/Select';
import Radio from '../Radio/Radio';
import Checkbox from '../Checkbox/Checkbox';

import styles from './Field.css';

const cx = classNames.bind(styles);

const Field = ({
  type = 'text',
  align = 'column',
  label,
  name,
  className,
  style,
  labelStyle,
  labelClassName,
  inputStyle,
  inputClassName,
  children,
  ...props
}) => {
  const isRowAlign = align === 'row';

  const classes = cx('Field', className, {
    Row: isRowAlign,
  });

  const labelClasses = cx(labelClassName, {
    LabelRow: isRowAlign,
  });

  const InputBase = matchStrict(type, {
    number: InputNumber,
    currency: InputCurrency,
    ssn: InputNumber,
    email: InputText,
    password: InputText,
    search: InputSearch,
    datepicker: InputDatepicker,
    select: Select,
    radio: Radio,
    checkbox: Checkbox,
    static: null, // if you want skip any inputBase component
  }, InputText);

  return (
    <div className={classes} style={style} >
      <Label labelFor={name} text={label} className={labelClasses} style={labelStyle} />
      {
        InputBase &&
        <InputBase
          name={name}
          type={['password', 'tel', 'email'].includes(type) ? type : 'text'}
          inputClassName={inputClassName}
          inputStyle={inputStyle}
          {...props}
        />
      }
      {children}
    </div>
  );
};

Field.displayName = 'Field';

Field.propTypes = {
  type: PropTypes.oneOf([
    'text',
    'email',
    'password',
    'tel',
    'number',
    'currency',
    'ssn',
    'select',
    'radio',
    'search',
    'datepicker',
    'static',
  ]),
  align: PropTypes.oneOf(['column', 'row']),
  label: PropTypes.string,
  name: PropTypes.string,

  style: PropTypes.object,
  className: PropTypes.string,

  labelStyle: PropTypes.object,
  labelClassName: PropTypes.string,

  inputStyle: PropTypes.object,
  inputClassName: PropTypes.string,

  children: PropTypes.node,
};

Field.defaultProps = {
  type: null,
  align: 'column',
  label: '',
  name: '',

  style: {},
  className: '',

  labelStyle: {},
  labelClassName: '',

  inputStyle: {},
  inputClassName: '',

  children: null,
};

export default Field;
