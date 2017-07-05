import React, { PropTypes } from 'react';

import classNames from 'classnames/bind';

import moment from 'moment';
import numeral from 'numeral';

import find from 'lodash/find';
import capitalize from 'lodash/capitalize';

import { TextLink, Heading } from '../UI';

import styles from './ClosestUpcomingTransactions.css';

const cx = classNames.bind(styles);

const ClosestUpcomingTransactions = ({ accounts, transactions }) => {
  const renderedTransactions = transactions.map((transaction) => {
    const {
      account_id: accountId,
      amount,
      date,
      id,
      recurring_transaction_group_id: groupId,
    } = transaction;

    const account = find(accounts, accountItem => accountItem.number === accountId) || {};
    const accountType = account.type;

    return (
      <div className={cx('Row')} key={`${id}-${groupId}`}>
        <div className={cx('BankAndDate')}>
          {moment(date).format('MM/DD/YYYY')}<br />
          {numeral(amount).format('$0,0.00')}
        </div>
        <div className={cx('Description')}>
          BANK OF AMERICA, N.A. (3905) to WorthFM {capitalize(accountType)} Account
        </div>
        <TextLink text="Edit" className={cx('EditLink')} />
      </div>
    );
  });

  return (
    <div className={cx('ClosestUpcomingTransactions')}>
      <Heading text="Your upcoming scheduled transfers" />
      {renderedTransactions}
      <TextLink text="See all scheduled transfers" to="/funding/transactions" />
    </div>
  );
};

ClosestUpcomingTransactions.displayName = 'ClosestUpcomingTransactions';

ClosestUpcomingTransactions.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object),
  transactions: PropTypes.arrayOf(PropTypes.object),
};

ClosestUpcomingTransactions.defaultProps = {
  accounts: [],
  transactions: [],
};

export default ClosestUpcomingTransactions;
