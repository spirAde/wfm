import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';

import styles from './Radio.css';

const cx = classNames.bind(styles);

class Radio extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const { onChange, disabled, value } = this.props;

    if (onChange && !disabled) {
      onChange(value, true);
    }
  }

  render() {
    const {
      defaultChecked,
      label,
      children,
      checked,
      name,
      disabled,
      className,
      transform,
      onChange,
    } = this.props;

    const props = {};

    if (typeof checked === 'boolean' && !disabled) {
      props.checked = checked;
    } else if (disabled) {
      props.checked = false;
    } else {
      props.defaultChecked = defaultChecked;
    }

    const radioClasses = cx('Radio', className);
    const indicatorStyle = transform ? { transform: `translateY(${transform})` } : {};

    return (
      <label className={radioClasses} htmlFor={name}>
        <input
          className={cx('RadioInput')}
          type="radio"
          name={name}
          id={name}
          onChange={this.handleChange}
          {...props}
        />
        <div
          className={cx('RadioIndicator')}
          style={indicatorStyle}
        />
        { label && <span className={cx('Label')}>{label}</span> }
        {
          children &&
          <div className={cx('Children')} onClick={this.handleChange}>
            {children}
          </div>
        }
      </label>
    );
  }
}

Radio.displayName = 'Radio';

Radio.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ]).isRequired,
  onChange: PropTypes.func,
  defaultChecked: PropTypes.bool,
  checked: PropTypes.bool,
  label: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  transform: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

Radio.defaultProps = {
  onChange: Function.prototype,
  defaultChecked: false,
  className: '',
  checked: false,
  label: '',
  children: [],
  disabled: false,
  transform: undefined,
};

export default Radio;
