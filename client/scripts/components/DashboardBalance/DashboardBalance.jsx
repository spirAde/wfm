import React, { PropTypes, Component } from 'react';

import classNames from 'classnames/bind';

import { TextLink } from '../UI';

import styles from './DashboardBalance.css';

import SavingsImg from '../../../images/dash_acc_savings.svg';
import InvestmentImg from '../../../images/dash_acc_invest.svg';
import RetirementImg from '../../../images/dash_acc_retire.svg';

const cx = classNames.bind(styles);

const DashboardBalance = () => (
  <div className={cx('DashboardBalance')}>
    <div className={cx('TotalBalance')}>
      <span className={cx('Text')}>
        Your WorthFM balance:
      </span>
      <span className={cx('Amount')}>
        <span className={cx('Sign')}>$</span>
        <span className={cx('Dollars')}>1,170,074</span>
        <span className={cx('Cents')}>.99</span>
      </span>
    </div>
    <div className={cx('AccountBalances')}>
      <div className={cx('Account')}>
        <img src={SavingsImg} alt="" />
        <div className={cx('Name')}>
          Savings <br />Account
        </div>
        <div className={cx('Amount')}>
          $400,072.33
        </div>
        <div className={cx('Pending')}>
          +$631.00 <br />pending
        </div>
        <div className={cx('ViewDetails')}>
          <TextLink text="View Details" to="/accounts/savings" />
        </div>
      </div>
      <div className={cx('Divider')} />
      <div className={cx('Account')}>
        <img src={InvestmentImg} alt="" />
        <div className={cx('Name')}>
          Investment <br />Account
        </div>
        <div className={cx('Amount')}>
          $400,072.33
        </div>
        <div className={cx('Pending')}>
          +$631.00 <br />pending
        </div>
        <div className={cx('ViewDetails')}>
          <TextLink text="View Details" to="/accounts/investment" />
        </div>
      </div>
      <div className={cx('Divider')} />
      <div className={cx('Account')}>
        <img src={RetirementImg} alt="" />
        <div className={cx('Name')}>
          Retirement <br />Account
        </div>
        <div className={cx('Amount')}>
          $400,072.33
        </div>
        <div className={cx('Pending')}>
          +$631.00 <br />pending
        </div>
        <div className={cx('ViewDetails')}>
          <TextLink text="View Details" to="/accounts/retirement" />
        </div>
      </div>
    </div>
  </div>
);

DashboardBalance.displayName = 'DashboardBalance';

DashboardBalance.propTypes = {};

DashboardBalance.defaultProps = {};

export default DashboardBalance;
