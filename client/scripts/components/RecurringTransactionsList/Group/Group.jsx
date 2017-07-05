import React, { PropTypes } from 'react';

import classNames from 'classnames/bind';

import find from 'lodash/find';
import capitalize from 'lodash/capitalize';

import numeral from 'numeral';

import PendingTransaction from '../PendingTransaction/PendingTransaction';
import UpcomingTransaction from '../UpcomingTransaction/UpcomingTransaction';

import { Icon, TextLink } from '../../UI';

import { matchStrict } from '../../../utils/match';

import styles from './Group.css';

const cx = classNames.bind(styles);

const VISIBLE_TRANSACTIONS_COUNT = 10;

const Group = ({
  activeGroupId,
  group,
  accounts,
  onClickEditGroup,
  onClickEditItem,
  onChangeActiveGroup
}) => {
  const {
    account_id: accountId,
    amount,
    period,
    stoppage_reason: stoppageReason,
    pending_transactions: pendingTransactions,
    upcoming_transactions: upcomingTransactions,
    status,
  } = group;

  const handleClickEditGroup = (event) => {
    event.preventDefault();

    onClickEditGroup(group.id);
  };

  const handleChangeActiveGroup = (event) => {
    event.preventDefault();

    onChangeActiveGroup(group.id === activeGroupId ? null : group.id);
  };

  const renderPendingTransactions = () => (
    pendingTransactions.map(transaction => (
      <PendingTransaction
        key={transaction.id}
        transaction={transaction}
      />
    ))
  );

  const renderUpcomingTransactions = () => {
    const transactions = pendingTransactions.length
      ? upcomingTransactions.slice(0, VISIBLE_TRANSACTIONS_COUNT - pendingTransactions.length)
      : upcomingTransactions.slice(0, VISIBLE_TRANSACTIONS_COUNT);

    return transactions.map(transaction => (
      <UpcomingTransaction
        key={transaction.id}
        transaction={transaction}
        group={group}
        onClickEditItem={onClickEditItem}
      />
    ));
  };

  const groupIsActive = !!activeGroupId && activeGroupId === group.id;

  const bankName = 'JPMORGAN CHASE BANK (1151)'; // TODO: change static

  const account = find(accounts, accountItem => accountItem.number === accountId) || {};
  const accountType = account.type;

  const periodText = matchStrict(period, {
    weekly: 'weekly',
    bi_weekly: 'bi-weekly',
  }, 'monthly');

  const annualIncomeIsExceed = stoppageReason === 'annual_income_limit_exceeded';
  const IRALimitIsExceed = stoppageReason === 'ira_limit_exceeded';
  const groupIsStopped = accountType === 'Retirement' && status === 'stopped';

  let renderedUpcomingTransactions = null;
  let renderedPendingTransactions = null;

  if (groupIsActive) {
    renderedUpcomingTransactions = renderUpcomingTransactions();
    renderedPendingTransactions = renderPendingTransactions();
  }

  return (
    <div className={cx('Group')}>
      <Icon
        icon={groupIsActive ? 'arrow-down' : 'arrow-right'}
        className={cx('Icon')}
        onClick={handleChangeActiveGroup}
      />
      <div className={cx('Details')}>
        <div>
          <span>
            {numeral(amount).format('$0,0.00')} {periodText} transfer
            from {bankName} to WorthFM {capitalize(accountType)} Account.
          </span>&nbsp;
          <TextLink text="Edit" onClick={handleClickEditGroup} className={cx('EditLink')} />
        </div>
        <div className={cx('Transactions')}>
          {
            groupIsActive &&
            <div>
              {
                annualIncomeIsExceed &&
                <p>
                  Your income exceeds the limits for continued contribution to your Roth IRA.
                  Please contact Client Service with any questions.
                </p>
              }
              {
                IRALimitIsExceed &&
                <p>
                  You have reached the annual contribution limit for your
                  WorthFM Retirement Account. We have paused future scheduled funding.
                </p>
              }
              <div>
                {renderedPendingTransactions}
                {renderedUpcomingTransactions}
              </div>
              {
                !groupIsStopped &&
                <p className={cx('GroupPeriodText')}>
                  This schedule will continue {period} until edited.
                </p>
              }
            </div>
          }
        </div>
      </div>
    </div>
  );
};

Group.displayName = 'Group';

Group.propTypes = {
  activeGroupId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  group: PropTypes.object,
  accounts: PropTypes.arrayOf(PropTypes.object),
  onClickEditGroup: PropTypes.func,
  onClickEditItem: PropTypes.func,
  onChangeActiveGroup: PropTypes.func,
};

Group.defaultProps = {
  activeGroupId: undefined,
  group: {},
  accounts: [],
  onClickEditGroup: Function.prototype,
  onClickEditItem: Function.prototype,
  onChangeActiveGroup: Function.prototype,
};

export default Group;
