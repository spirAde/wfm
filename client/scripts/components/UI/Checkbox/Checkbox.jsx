import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';

import styles from './Checkbox.css';

const cx = classNames.bind(styles);

class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { onChange } = this.props;

    if (onChange) {
      onChange(event.target.checked);
    }
  }

  render() {
    const {
      defaultChecked,
      label,
      children,
      checked,
      name,
      className,
      labelClassName,
      indicatorClassName,
      transform,
    } = this.props;

    const props = {};

    if (typeof checked === 'boolean') {
      props.checked = checked;
    } else {
      props.defaultChecked = defaultChecked;
    }

    const checkboxClasses = cx('Checkbox', className);
    const indicatorStyle = transform ? { transform: `translateY(${transform})` } : {};

    return (
      <label htmlFor={name} className={checkboxClasses}>
        <input
          className={cx('CheckboxInput')}
          id={name}
          name={name}
          type="checkbox"
          onChange={this.handleChange}
          {...props}
        />
        <div className={cx('CheckboxIndicator', indicatorClassName)} style={indicatorStyle} />
        { label && <span className={cx('Label', labelClassName)}>{label}</span> }
        { children }
      </label>
    );
  }
}

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  label: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  indicatorClassName: PropTypes.string,
  transform: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.number,
  ]),
};

Checkbox.defaultProps = {
  onChange: Function.prototype,
  children: null,
  className: '',
  labelClassName: '',
  indicatorClassName: '',
  checked: false,
  defaultChecked: false,
  label: '',
  transform: null,
};

export default Checkbox;
