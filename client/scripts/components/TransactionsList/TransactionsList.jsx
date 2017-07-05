import React, { PropTypes, Component } from 'react';

import classNames from 'classnames/bind';

import { Heading, TextLink } from '../UI';
import SectionConductor from '../SectionConductor/SectionConductor';

import Transaction from './Transaction/Transaction';

import styles from './TransactionsList.css';

const accounts = [
  { type: 'savings', number: '1638', account: '901132360' },
  { type: 'investment', number: '1639', account: '901336860' },
  { type: 'retirement', number: '1640', account: '901504160' },
];

const cx = classNames.bind(styles);

class TransactionsList extends Component {
  constructor(props) {
    super(props);

    this.handleChangeFilter = this.handleChangeFilter.bind(this);
  }

  handleChangeFilter({ startDate, endDate, transactionStatus, account, fundingType }) {
    console.log({ startDate, endDate, transactionStatus, account, fundingType });
  }

  renderRecurringTransactions() {}

  renderTransactions() {
    const { transactions, accountType } = this.props;

    return transactions.map(transaction => (
      <Transaction
        key={transaction.id}
        transaction={transaction}
        accounts={accounts}
        accountType={accountType}
      />
    ));
  }

  renderList() {}

  render() {
    const { accountType, isFilterable } = this.props;

    const isAllTransactions = !accountType;

    const renderedTransactions = this.renderTransactions();

    return (
      <div className={cx('TransactionsList')}>
        <div className={cx('Header')}>
          <Heading text={isAllTransactions ? 'All transactions' : 'Recent transactions'} />
          {
            !isAllTransactions &&
            <TextLink
              to="/funding/transactions"
              text="View all transactions"
              className={cx('ViewAll')}
            />
          }
        </div>
        {
          isFilterable &&
          <SectionConductor
            onChangeFilter={this.handleChangeFilter}
            component="TransactionsFilter"
            zeroPadding
          />
        }
        <div className={cx('List')}>
          {renderedTransactions}
        </div>
      </div>
    );
  }
}

TransactionsList.displayName = 'TransactionsList';

TransactionsList.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object),
  accountType: PropTypes.oneOf(['savings', 'investment', 'retirement', undefined]),
  isFilterable: PropTypes.bool,
};

TransactionsList.defaultProps = {
  transactions: [],
  accountType: undefined,
  isFilterable: false,
};

export default TransactionsList;
