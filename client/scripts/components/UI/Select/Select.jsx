import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import onClickOutside from 'react-onclickoutside';
import shallowCompare from 'react-addons-shallow-compare';

import find from 'lodash/find';

import Icon from '../Icon/Icon';
import Option from './Option/Option';

import styles from './Select.css';

const cx = classNames.bind(styles);

class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      isOpen: false,
    };

    this.handleClickToggleMenu = this.handleClickToggleMenu.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleClickOutside() {
    this.setState({
      isOpen: false,
    });
  }

  handleChange(value) {
    this.setState({
      value,
    }, () => this.props.onChange(value));
  }

  handleClickToggleMenu(event) {
    event.preventDefault();

    const { isOpen } = this.state;

    this.setState({
      isOpen: !isOpen,
    });
  }

  renderBox() {
    const { isOpen } = this.state;

    if (!isOpen) return null;

    const renderedOptions = this.renderOptions();

    return (
      <div className={cx('Box')}>
        <div className={cx('OptionList')}>
          {renderedOptions}
        </div>
      </div>
    );
  }

  renderOptions() {
    const { options, disabledOptions } = this.props;
    const { value: selectedValue } = this.state;

    return options.map((option, index) => {
      const { value } = option;

      const isSelected = value === selectedValue;
      const isDisabled = disabledOptions.includes(value);

      return (
        <Option
          isSelected={isSelected}
          isDisabled={isDisabled}
          option={option}
          key={index}
          onClick={this.handleChange}
        />
      );
    });
  }

  render() {
    const { value: selectedValue, isOpen } = this.state;
    const { options, placeholder, errorText, onBlur, errorClassName } = this.props;

    const selectedOption = find(options, option => option.value === selectedValue) || {};

    const label = selectedValue
      ? selectedOption.label || placeholder
      : placeholder;

    const isError = !!errorText;
    const renderedBox = this.renderBox();

    const fieldClasses = cx('Field', {
      Error: isError,
    });

    const labelClasses = cx('Label', {
      Placeholder: !selectedValue && placeholder,
    });

    const errorClasses = cx('ErrorField', errorClassName);

    return (
      <div className={cx('Select')} onClick={this.handleClickToggleMenu} tabIndex="0" onBlur={onBlur}>
        <div className={fieldClasses}>
          <div className={labelClasses}>
            <span>{label}</span>
          </div>
          <span className={cx('ArrowZone')}>
            {
              isOpen
              ? <Icon icon="arrow-up" stroke="#464646" />
              : <Icon icon="arrow-down" stroke="#464646" />
            }
          </span>
        </div>
        {renderedBox}
        {isError && <div className={errorClasses}>{errorText}</div>}
      </div>
    );
  }
}

Select.displayName = 'Select';

Select.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  options: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  disabledOptions: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
  errorText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  errorClassName: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

Select.defaultProps = {
  placeholder: '',
  value: undefined,
  options: [],
  disabledOptions: [],
  errorClassName: '',
  errorText: '',
  onChange: Function.prototype,
  onBlur: Function.prototype,
};

export default onClickOutside(Select);
export { Select as PureSelect }; // for test
