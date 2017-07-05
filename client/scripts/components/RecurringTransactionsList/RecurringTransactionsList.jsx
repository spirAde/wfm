import React, { PropTypes } from 'react';

import classNames from 'classnames/bind';

import { Heading, Button } from '../UI';

import Group from './Group/Group';

import styles from './RecurringTransactionsList.css';

const accounts = [
  { type: 'savings', number: '1638', account: '901132360' },
  { type: 'investment', number: '1639', account: '901336860' },
  { type: 'retirement', number: '1640', account: '901504160' },
];

const cx = classNames.bind(styles);

const RecurringTransactionsList = ({
  activeGroupId,
  groups,
  accounts,
  onClickCreateGroup,
  onClickEditGroup,
  onClickEditItem,
  onChangeActiveGroup,
}) => {
  const renderedGroups = groups.map(group => (
    <Group
      key={group.id}
      activeGroupId={activeGroupId}
      group={group}
      accounts={accounts}
      onClickEditGroup={onClickEditGroup}
      onClickEditItem={onClickEditItem}
      onChangeActiveGroup={onChangeActiveGroup}
    />
  ));

  return (
    <div className={cx('RecurringTransactionsList')}>
      <Heading text="Scheduled Transactions" />
      <div>
        {renderedGroups}
      </div>
      <div>
        <Button
          label="Schedule a Transfer"
          kind="secondary"
          onClick={onClickCreateGroup}
          className={cx('Button')}
        />
      </div>
    </div>
  );
};

RecurringTransactionsList.displayName = 'RecurringTransactionsList';

RecurringTransactionsList.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object),
  activeGroupId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  groups: PropTypes.arrayOf(PropTypes.object),
  onClickCreateGroup: PropTypes.func,
  onClickEditGroup: PropTypes.func,
  onClickEditItem: PropTypes.func,
  onChangeActiveGroup: PropTypes.func,
};

RecurringTransactionsList.defaultProps = {
  accounts: [],
  activeGroupId: undefined,
  groups: [],
  onClickCreateGroup: Function.prototype,
  onClickEditGroup: Function.prototype,
  onClickEditItem: Function.prototype,
  onChangeActiveGroup: Function.prototype,
};

export default RecurringTransactionsList;
