import React, { PropTypes } from 'react';

import classNames from 'classnames/bind';

import moment from 'moment';
import numeral from 'numeral';

import capitalize from 'lodash/capitalize';
import find from 'lodash/find';

import { match } from '../../../utils/match';

import styles from './Transaction.css';

const cx = classNames.bind(styles);

const Transaction = ({ transaction, accounts, accountType }) => {
  const {
    status,
    type,
    completion_method: method,
    account_id: accountId,
    created_at: createdAt,
  } = transaction;

  const account = find(accounts, accountItem => accountItem.number === accountId) || {};
  const accountName = capitalize(account.type);

  const isCompleted = status === 'complete';
  const isCanceled = status === 'not_enough_money' || status === 'rejected';
  const isError = ['unexpected_error', 'account_error', 'alert_not_delivered', 'error', 'unauthorized_to_vanare'].includes(status);
  const isProcessing = ['pending_account_activation', 'ready_to_process', 'pending_on_vanare', 'vanare_timeout'].includes(status);

  /*eslint-disable */
  const statusText =
    isCompleted   ? 'Completed' :
    isCanceled    ? 'Canceled' :
    isError       ? 'Error' :
    isProcessing  ? 'Processing'
                  : '';
  /*eslint-enable */

  const typeText = match(type, {
    deposit: () => (method === 'check' || method === 'wire' ? `${capitalize(method)} Deposit` : 'Deposit'),
    internal: 'WorthFM Transfer',
    withdraw: 'Funds Withdraw',
    dividend: 'Dividend deposit',
    interest_payment: 'Interest Deposit',
    fee: 'WorthFM Fee',
  }, '');

  const date = moment(createdAt).format('MM/DD/YYYY');

  let rate = 1;

  const description = match(type, {
    deposit: () => {
      const { bank_name: bankName, client_bank_account_number: bankAccountNumber } = transaction;

      if (method === 'check' || method === 'wire') {
        return `to WorthFM ${accountName} Account`;
      }

      return bankName && bankAccountNumber
        ? `${bankName} (${bankAccountNumber.slice(-4)}) to WorthFM ${accountName} Account`
        : `WorthFM ${accountName} Account`;
    },
    internal: () => {
      if (accountType) {
        if (account.id === find(accounts, acc => acc.type === accountType).id) {
          rate = -1;
        }
      }

      const { receiving_account_number: receivingAccountNumber } = transaction;

      const toAccount = find(
        accounts,
        accountItem => parseInt(accountItem.account, 10) === parseInt(receivingAccountNumber, 10),
      ) || {};

      const to = capitalize(toAccount.type || '');

      return `WorthFM ${accountName} Account to WorthFM ${to} Account`;
    },
    withdraw: () => {
      rate = -1;

      const { bank_name: bankName, client_bank_account_number: bankAccountNumber } = transaction;

      return bankName && bankAccountNumber
        ? `WorthFM ${accountName} Account to ${bankName} (${bankAccountNumber.slice(-4)})`
        : `WorthFM ${accountName} Account`;
    },
    fee: () => {
      rate = -1;
      return `WorthFM ${accountName} Account to WorthFM`;
    },
    dividend: `to WorthFM ${accountName} Account`,
    interest_payment: `to WorthFM ${accountName} Account`,
  }, '');

  const fixedAmount = rate * transaction.amount;
  const amount = numeral(fixedAmount).format('$0,0.00');

  const CircleClasses = cx('Circle', {
    Completed: isCompleted,
    Canceled: isCanceled,
    Error: isError,
    Processing: isProcessing,
  });

  const StatusClasses = cx('Status', {
    Completed: isCompleted,
    Canceled: isCanceled,
    Error: isError,
    Processing: isProcessing,
  });

  return (
    <div className={cx('Transaction')}>
      <div className={cx('DateSum')}>
        <div className={cx('Date')}>{date}</div>
        <div className={cx('Sum')}>{amount}</div>
      </div>
      <div className={cx('Marker')}>
        <span className={CircleClasses} />
      </div>
      <div className={cx('Details')}>
        <div className={cx('Title')}>
          <span className={StatusClasses}>{statusText}</span> &nbsp;  | &nbsp; {typeText}
        </div>
        <div>
          {description}
        </div>
      </div>
    </div>
  );
};

Transaction.displayName = 'Transaction';

Transaction.propTypes = {
  transaction: PropTypes.objectOf(PropTypes.any),
  accounts: PropTypes.arrayOf(PropTypes.object),
  accountType: PropTypes.oneOf(['savings', 'investment', 'retirement', undefined]),
};

Transaction.defaultProps = {
  transaction: {},
  accounts: [],
  accountType: undefined,
};

export default Transaction;
