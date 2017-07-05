import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import shallowCompare from 'react-addons-shallow-compare';

import classNames from 'classnames/bind';

import SectionConductor from '../../components/SectionConductor/SectionConductor';

import AccountInvestmentSelectors from '../../selectors/AccountInvestmentSelectors';

import styles from './AccountInvestmentPage.css';

const cx = classNames.bind(styles);

class AccountInvestmentPage extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { transactions } = this.props;

    return (
      <div className={cx('AccountInvestmentPage')}>
        <Helmet title="Investment" />
        <SectionConductor
          border="bottom"
          borderColor="yellow"
          borderWidth="fat"
          accountType="investment"
          component="AccountBalance"
        />
        <SectionConductor
          border="bottom"
          borderColor="grey"
          borderWidth="basic"
          accountType="investment"
          component="FundingDepositForm"
        />
        <SectionConductor
          border="bottom"
          borderColor="grey"
          borderWidth="basic"
          accountType="investment"
          component="PerformanceChart"
        />
        <SectionConductor
          border="bottom"
          borderColor="grey"
          borderWidth="basic"
          accountType="investment"
          component="HoldingsList"
        />
        <SectionConductor
          border="bottom"
          borderColor="grey"
          borderWidth="basic"
          accountType="investment"
          transactions={transactions}
          component="TransactionsList"
        />
      </div>
    );
  }
}

AccountInvestmentPage.displayName = 'AccountInvestmentPage';

AccountInvestmentPage.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object),
};

AccountInvestmentPage.defaultProps = {
  transactions: [],
};

export default connect(AccountInvestmentSelectors)(AccountInvestmentPage);
