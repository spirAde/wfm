import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import assign from 'lodash/assign';

import Icon from '../../Icon/Icon';

import styles from './InputText.css';

const cx = classNames.bind(styles);

const InputText = ({
  type,
  placeholder,
  inputRef,
  icon,
  iconAlign,
  name,
  align,
  inputClassName,
  inputStyle,
  errorText,
  errorClassName,
  errorStyle,
  ...otherProps
}) => {
  const isError = !!errorText;

  const iconClasses = cx('Icon', {
    AlignLeft: iconAlign === 'left',
    AlignRight: iconAlign === 'right',
  });

  const inputClasses = cx('InputText', {
    Row: align === 'row',
  });
  const inputFieldClasses = cx('InputField', inputClassName, {
    Error: isError,
  });
  const errorFieldClasses = cx('ErrorField', errorClassName);

  const ref = inputRef || ((input) => { this.input = input; });

  const inputPaddingLeft = inputStyle.paddingLeft || (icon && iconAlign === 'left' ? 28 : 10);
  const inputPaddingRight = inputStyle.paddingRight || (icon && iconAlign === 'right' ? 28 : 10);

  return (
    <div className={inputClasses}>
      <div className={cx('InputBase')}>
        {icon && <Icon icon={icon} className={iconClasses} />}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className={inputFieldClasses}
          style={assign(inputStyle, {
            paddingLeft: inputPaddingLeft,
            paddingRight: inputPaddingRight,
          })}
          ref={ref}
          {...otherProps}
        />
        {isError && <div className={errorFieldClasses} style={errorStyle}>{errorText}</div>}
      </div>
    </div>
  );
};

InputText.displayName = 'InputText';

InputText.propTypes = {
  align: PropTypes.oneOf(['row', 'column']),

  inputClassName: PropTypes.string,
  inputStyle: PropTypes.object,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password', 'email', 'tel']),
  icon: PropTypes.string,
  iconAlign: PropTypes.oneOf(['left', 'right']),

  errorText: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  errorClassName: PropTypes.string,
  errorStyle: PropTypes.object,
  inputRef: PropTypes.func,

  onChange: PropTypes.func,
};

InputText.defaultProps = {
  inputClassName: '',
  inputStyle: {},
  errorClassName: '',
  errorStyle: {},
  placeholder: '',
  name: '',
  icon: '',
  iconAlign: 'left',
  type: 'text',
  value: '',
  align: 'column',
  errorText: '',
  inputRef: Function.prototype,
  onChange: Function.prototype,
};

export default InputText;
