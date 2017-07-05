import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';

import styles from './InputNumber.css';

import InputText from '../InputText/InputText';
import patterns from './utils/patterns';

const cx = classNames.bind(styles);

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

class InputNumber extends Component {
  constructor(props) {
    super(props);

    const { formattedValue, value } = this.format(props.value);

    this.state = {
      value,
      formattedValue,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { formattedValue, value } = this.format(nextProps.value);

    this.setState({
      value,
      formattedValue,
    });
  }

  getSeparators() {
    let { thousandSeparator, decimalSeparator } = this.props;
    if (thousandSeparator === true) {
      thousandSeparator = ',';
    }

    if (decimalSeparator && thousandSeparator) {
      decimalSeparator = thousandSeparator === ',' ? '.' : ',';
    }

    if (decimalSeparator === true) {
      decimalSeparator = '.';
    }

    return {
      decimalSeparator,
      thousandSeparator,
    };
  }

  getNumberRegex(g) {
    const { decimalSeparator } = this.getSeparators();
    const escapedSeparator = decimalSeparator ? `|${escapeRegExp(decimalSeparator)}` : '';
    const isGlobal = g ? 'g' : undefined;

    return new RegExp(`\\d${escapedSeparator}`, isGlobal);
  }

  getCursorPosition(inputValue, formattedValue, cursorPos) {
    const numRegex = this.getNumberRegex();

    let j = 0;

    for (let i = 0; i < cursorPos; i += 1) {
      if (!inputValue[i].match(numRegex) && inputValue[i] !== formattedValue[j]) continue;

      while (inputValue[i] !== formattedValue[j] && j < formattedValue.length) j += 1;

      j += 1;
    }

    // check if there is no number before caret position
    while (j > 0 && formattedValue[j]) {
      if (!formattedValue[j - 1].match(numRegex)) j -= 1;

      else break;
    }

    return j;
  }

  setCaretPosition(caretPos) {
    const el = this.input;

    if (el) {
      if (el.createTextRange) {
        const range = el.createTextRange();
        range.move('character', caretPos);
        range.select();

        return true;
      }
      // (el.selectionStart === 0 added for Firefox bug)
      if (el.selectionStart || el.selectionStart === 0) {
        el.focus();
        el.setSelectionRange(caretPos, caretPos);

        return true;
      }
    }

    return false;
  }

  prepareInput(value) {
    const numRegex = this.getNumberRegex(true);
    const valueStr = value ? value.toString() : '';

    if (!valueStr || !(valueStr.match(numRegex))) return null;

    return valueStr.match(numRegex).join('');
  }

  prepareOutput(formattedValue) {
    const numRegex = this.getNumberRegex(true);

    return {
      value: formattedValue.match(numRegex).join(''),
      formattedValue,
    };
  }

  format(value) {
    const { pattern, decimalSeparator, thousandSeparator } = this.props;
    const preparedValue = this.prepareInput(value);

    if (!preparedValue) {
      return { value: '', formattedValue: '' };
    }

    let formattedValue = '';

    if (pattern && patterns[pattern]) {
      const formatPattern = patterns[pattern];

      formattedValue = typeof formatPattern === 'string'
        ? this.formatWithPattern(preparedValue, formatPattern)
        : formatPattern(preparedValue, decimalSeparator, thousandSeparator);
    } else {
      formattedValue = this.formatInput(preparedValue);
    }

    return this.prepareOutput(formattedValue);
  }

  formatInput(value) {
    const { thousandSeparator, decimalSeparator } = this.getSeparators();

    let formattedValue = value;

    let beforeDecimal = formattedValue;
    let afterDecimal = '';

    const hasDecimals = formattedValue.indexOf(decimalSeparator) !== -1;

    if (decimalSeparator && hasDecimals) {
      const parts = formattedValue.split(decimalSeparator);
      beforeDecimal = parts[0];
      afterDecimal = parts[1];
    }

    if (thousandSeparator) {
      beforeDecimal = beforeDecimal.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + thousandSeparator);
    }

    formattedValue = beforeDecimal + (hasDecimals && decimalSeparator || '') + afterDecimal;

    return formattedValue;
  }

  formatWithPattern(valueStr, pattern) {
    const hashCount = pattern.split('X').length - 1;

    let hashIdx = 0;
    let formattedString = pattern;

    for (let i = 0, ln = valueStr.length; i < ln; i += 1) {
      if (i < hashCount) {
        hashIdx = formattedString.indexOf('X');
        formattedString = formattedString.replace('X', valueStr[i]);
      }
    }

    const lastIdx = formattedString.lastIndexOf('X');

    return formattedString.substring(0, hashIdx + 1) +
      (lastIdx !== -1 ? formattedString.substring(lastIdx + 1, formattedString.length) : '');
  }

  handleChange(event) {
    event.preventDefault();

    const { formattedValue, value } = this.format(event.target.value);

    const inputValue = event.target.value.toString();
    let cursorPos = this.input.selectionStart;

    this.setState({ value, formattedValue }, () => {
      cursorPos = this.getCursorPosition(inputValue, formattedValue, cursorPos);
      this.setCaretPosition(cursorPos);

      this.props.onChange(value);
    });

    return value;
  }

  render() {
    const {
      inputRef,

      // TODO: delete this props to dont pass them to child InputText
      precision,
      decimalSeparator,
      thousandSeparator,
      pattern,
      onChange,
      value,
      ...otherProps,
    } = this.props;

    const ref = inputRef || ((input) => { this.input = input; });

    return (
      <div className={cx('InputNumber')}>
        <InputText
          type="tel"
          inputRef={ref}
          onChange={this.handleChange}
          value={this.state.formattedValue}
          {...otherProps}
        />
      </div>
    );
  }
}

InputNumber.displayName = 'InputNumber';

InputNumber.propTypes = {
  ...InputText.propTypes,
  precision: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  thousandSeparator: PropTypes.oneOf([',', '.', true, false]),
  decimalSeparator: PropTypes.oneOf([',', '.', true, false]),
  pattern: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  onChange: PropTypes.func,
};

InputNumber.defaultProps = {
  precision: 0,
  decimalSeparator: false,
  thousandSeparator: false,
  pattern: '',
  onChange: Function.prototype,
};

export default InputNumber;
