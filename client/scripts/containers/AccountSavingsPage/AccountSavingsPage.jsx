import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import shallowCompare from 'react-addons-shallow-compare';

import classNames from 'classnames/bind';

import SectionConductor from '../../components/SectionConductor/SectionConductor';

import AccountSavingsSelectors from '../../selectors/AccountSavingsSelectors';

import styles from './AccountSavingsPage.css';

const cx = classNames.bind(styles);

class AccountSavingsPage extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { transactions } = this.props;

    return (
      <div className={cx('AccountSavingsPage')}>
        <Helmet title="Savings" />
        <SectionConductor
          border="bottom"
          borderColor="yellow"
          borderWidth="fat"
          accountType="savings"
          component="AccountBalance"
        />
        <SectionConductor
          border="bottom"
          borderColor="grey"
          borderWidth="basic"
          accountType="savings"
          component="FundingDepositForm"
        />
        <SectionConductor
          border="bottom"
          borderColor="grey"
          borderWidth="basic"
          accountType="savings"
          transactions={transactions}
          component="TransactionsList"
        />
      </div>
    );
  }
}

AccountSavingsPage.displayName = 'AccountSavingsPage';

AccountSavingsPage.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object),
};

AccountSavingsPage.defaultProps = {
  transactions: [],
};

export default connect(AccountSavingsSelectors)(AccountSavingsPage);
