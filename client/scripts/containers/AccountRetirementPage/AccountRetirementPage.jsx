import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import shallowCompare from 'react-addons-shallow-compare';

import classNames from 'classnames/bind';

import SectionConductor from '../../components/SectionConductor/SectionConductor';

import AccountRetirementSelectors from '../../selectors/AccountRetirementSelectors';

import styles from './AccountRetirementPage.css';

const cx = classNames.bind(styles);

class AccountRetirementPage extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { transactions } = this.props;

    return (
      <div className={cx('AccountRetirementPage')}>
        <Helmet title="Retirement" />
        <SectionConductor
          border="bottom"
          borderColor="yellow"
          borderWidth="fat"
          accountType="retirement"
          component="AccountBalance"
        />
        <SectionConductor
          border="bottom"
          borderColor="grey"
          borderWidth="basic"
          accountType="retirement"
          component="FundingDepositForm"
        />
        <SectionConductor
          border="bottom"
          borderColor="grey"
          borderWidth="basic"
          component="ActivationRetirementForm"
        />
        <SectionConductor
          border="bottom"
          borderColor="grey"
          borderWidth="basic"
          accountType="retirement"
          component="PerformanceChart"
        />
        <SectionConductor
          border="bottom"
          borderColor="grey"
          borderWidth="basic"
          accountType="retirement"
          component="HoldingsList"
        />
        <SectionConductor
          border="bottom"
          borderColor="grey"
          borderWidth="basic"
          accountType="retirement"
          transactions={transactions}
          component="TransactionsList"
        />
      </div>
    );
  }
}

AccountRetirementPage.displayName = 'AccountRetirementPage';

AccountRetirementPage.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object),
};

AccountRetirementPage.defaultProps = {
  transactions: [],
};

export default connect(AccountRetirementSelectors)(AccountRetirementPage);
