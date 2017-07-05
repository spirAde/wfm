import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';

import styles from './InputSSN.css';

import InputText from '../InputText/InputText';

const cx = classNames.bind(styles);

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function isZero(value) {
  return !isNaN(parseFloat(value)) && isFinite(value) && parseInt(value, 10) === 0;
}

class InputSSN extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.formatInput(props.value).value,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: this.formatInput(nextProps.value).value,
    });
  }

  getNumberRegex(g) {
    const { decimalSeparator, precision } = this.props;
    return new RegExp('\\d' + (precision > 0 ? '|' + escapeRegExp(decimalSeparator) : ''), g ? 'g' : undefined);
  }

  formatInput(value) {
    const { decimalSeparator, thousandSeparator } = this.props;

    let valueStr = value || isZero(value)
      ? value.toString().replace(/^0+(?!\.|$)/, '') // remove leading zeros
      : '';

    if (valueStr === '.') valueStr = '0.'; // add leading zero if start typing with dot

    const numRegex = this.getNumberRegex(true);

    if (!valueStr || !(valueStr.match(numRegex))) {
      return { value: '', formattedValue: '' };
    }

    let formattedValue = valueStr.match(numRegex).join('');

    let beforeDecimal = formattedValue;
    let afterDecimal = '';

    const hasDecimals = formattedValue.indexOf(decimalSeparator) !== -1;

    if (hasDecimals) {
      const parts = formattedValue.replace(/(.*\.[0-9][0-9]?).*/g, '$1').split(decimalSeparator);

      beforeDecimal = parts[0];
      afterDecimal = parts[1];
    }

    beforeDecimal = beforeDecimal.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + thousandSeparator);

    formattedValue = beforeDecimal + (hasDecimals && decimalSeparator || '') + afterDecimal;

    return {
      value: parseFloat(formattedValue.match(numRegex).join('')),
      formattedValue,
    };
  }

  getCursorPosition(inputValue, formattedValue, cursorPos) {
    const numRegex = this.getNumberRegex();

    let j = 0;

    for (let i = 0; i < cursorPos; i++) {
      if (!inputValue[i].match(numRegex) && inputValue[i] !== formattedValue[j]) continue;

      while (inputValue[i] !== formattedValue[j] && j < formattedValue.length) j++;

      j++;
    }

    // check if there is no number before caret position
    while (j > 0 && formattedValue[j]) {
      if (!formattedValue[j - 1].match(numRegex)) j--;

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
  }

  handleChange(event) {
    event.preventDefault();

    const { formattedValue, value } = this.formatInput(event.target.value);

    const inputValue = event.target.value.toString();
    let cursorPos = this.input.selectionStart;

    this.setState({ value: formattedValue }, () => {
      cursorPos = this.getCursorPosition(inputValue, formattedValue, cursorPos);
      this.setCaretPosition(cursorPos);

      this.props.onChange(value);
    });

    return value;
  }

  render() {
    const { value } = this.state;
    const { symbol, withStaticDecimals } = this.props;

    const classes = cx('InputNumber', {
      WithSymbol: symbol,
    });

    return (
      <div className={classes}>
        {symbol && <span className={cx('Symbol')}>{symbol}</span>}
        <InputText
          ref={(input) => { this.input = input; }}
          onChange={this.handleChange}
          inputStyle={{
            paddingLeft: symbol ? 25 : 10,
            paddingRight: withStaticDecimals ? 28 : 10,
          }}
          value={value}
        />
        {
          withStaticDecimals &&
          <div className={cx('DecimalsField')}>
            <span className={cx('Decimals')}>.00</span>
          </div>
        }
      </div>
    );
  }
}

InputSSN.displayName = 'InputSSN';

InputSSN.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  symbol: PropTypes.string,
  precision: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  decimalSeparator: PropTypes.string,
  thousandSeparator: PropTypes.string,
  withStaticDecimals: PropTypes.bool,
};

InputSSN.defaultProps = {
  onChange: Function.prototype,
  symbol: '',
  precision: 0,
  decimalSeparator: '.',
  thousandSeparator: ',',
  value: '',
  withStaticDecimals: false,
};

export default InputSSN;
