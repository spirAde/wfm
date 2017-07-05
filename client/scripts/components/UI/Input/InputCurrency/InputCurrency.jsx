import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import styles from './InputCurrency.css';

import InputNumber from '../InputNumber/InputNumber';

const cx = classNames.bind(styles);

const InputCurrency = ({
  symbol,
  staticCents,
  decimalSeparator,
  ...otherProps
}) => {
  const withSymbol = !!symbol;

  const classes = cx('InputCurrency', {
    WithSymbol: withSymbol,
  });

  return (
    <div className={classes}>
      {symbol && <span className={cx('Symbol')}>{symbol}</span>}
      <InputNumber
        inputStyle={{
          paddingLeft: withSymbol ? 25 : 10,
          paddingRight: staticCents ? 28 : 10,
        }}
        pattern="currency"
        decimalSeparator={staticCents ? false : decimalSeparator}
        {...otherProps}
      />
      {
        staticCents &&
        <div className={cx('CentsField')}>
          <span className={cx('Cents')}>.00</span>
        </div>
      }
    </div>
  );
};

InputCurrency.displayName = 'InputCurrency';

InputCurrency.propTypes = {
  ...InputNumber.propTypes,
  symbol: PropTypes.string,
  staticCents: PropTypes.bool,
};

InputCurrency.defaultProps = {
  symbol: '$',
  staticCents: false,
  onChange: Function.prototype,
  decimalSeparator: '.',
  thousandSeparator: ',',
};

export default InputCurrency;
