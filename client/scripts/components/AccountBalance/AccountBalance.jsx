import React, { PropTypes } from 'react';

import classNames from 'classnames/bind';

import styles from './AccountBalance.css';

import SavingsImg from '../../../images/dash_acc_savings.svg';
import InvestmentImg from '../../../images/dash_acc_invest.svg';
import RetirementImg from '../../../images/dash_acc_retire.svg';

const IMAGES = {
  savings: SavingsImg,
  investment: InvestmentImg,
  retirement: RetirementImg,
};

const cx = classNames.bind(styles);

const AccountBalance = ({ accountType, balance }) => (
  <div className={cx('AccountBalance')}>
    <div className={cx('Information')}>
      <div className={cx('Account')}>
        <div className={cx('AccountImage')}>
          <img src={IMAGES[accountType]} />
        </div>
        <div className={cx('AccountNameAndNumber')}>
          <span>{accountType} account:</span>
          <span>Account number: 901504160</span>
        </div>
      </div>
      <div className={cx('AccountAmounts')}>
          <span className={cx('Amount')}>
            <span className={cx('Sign')}>$</span>
            <span className={cx('Dollars')}>1,170,074</span>
            <span className={cx('Cents')}>.99</span>
          </span>
        <span className={cx('Pending')}>+$6,191.12 pending</span>
      </div>
    </div>
    <div className={cx('Description')}>
      As of 05/06/2016 you’ve contributed $59,041.86 and earned -$1,969.46
    </div>
  </div>
);

AccountBalance.displayName = 'AccountBalance';

AccountBalance.propTypes = {
  accountType: PropTypes.oneOf(['savings', 'investment', 'retirement']),
  balance: PropTypes.number,
};

AccountBalance.defaultProps = {
  accountType: 'savings',
  balance: 0,
};

export default AccountBalance;
