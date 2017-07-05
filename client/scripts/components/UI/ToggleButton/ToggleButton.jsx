import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import shallowCompare from 'react-addons-shallow-compare';

import styles from './ToggleButton.css';

const cx = classNames.bind(styles);

class ToggleButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: props.selectedValue,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleClickOption(value, event) {
    event.preventDefault();

    this.setState({
      selectedValue: value,
    });

    this.props.onClick(value);
  }

  renderOptions() {
    const {
      options,
      optionClassName, optionStyle,
      selectedOptionClassName, selectedOptionStyle,
    } = this.props;
    const { selectedValue } = this.state;

    return options.map((option, index) => {
      const { value, label } = option;

      const isActive = value === selectedValue;

      const classes = cx('Label', optionClassName, {
        Active: isActive,
        [selectedOptionClassName]: isActive && selectedOptionClassName
          ? selectedOptionClassName
          : false,
      });

      const style = isActive
        ? { ...optionStyle, ...selectedOptionStyle }
        : optionStyle;

      return (
        <label className={classes} htmlFor={value} key={index} style={style}>
          <input
            type="radio"
            id={value}
            className={styles.Radio}
            onClick={this.handleClickOption.bind(this, value)}
          />
          {label}
        </label>
      );
    });
  }

  render() {
    const { className, style } = this.props;

    const renderedOptions = this.renderOptions();

    const classes = cx('ToggleButton', className);

    return (
      <div className={classes} style={style}>
        {renderedOptions}
      </div>
    );
  }
}

ToggleButton.displayName = 'ToggleButton';

ToggleButton.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  optionClassName: PropTypes.string,
  optionStyle: PropTypes.object,
  selectedOptionClassName: PropTypes.string,
  selectedOptionStyle: PropTypes.object,
};

ToggleButton.defaultProps = {
  selectedValue: undefined,
  onClick: Function.prototype,
  className: '',
  style: {},
  optionClassName: '',
  optionStyle: {},
  selectedOptionClassName: '',
  selectedOptionStyle: {},
};

export default ToggleButton;
