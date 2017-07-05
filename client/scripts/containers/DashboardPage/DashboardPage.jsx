import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import shallowCompare from 'react-addons-shallow-compare';

import DashboardSelectors from '../../selectors/DashboardSelectors';

import TileConductor from '../../components/TileConductor/TileConductor';

class DashboardPage extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { accounts, closestRecurringTransactions } = this.props;

    return (
      <div>
        <Helmet title="Dashboard" />
        <TileConductor
          component="DashboardBalance"
          style={{ border: 0, borderRadius: '0 0 5px 5px' }}
        />
        <TileConductor
          isClosable
          eyebrow="moneytype"
          component="MoneyTypeTakeAssessment"
        />
        <TileConductor
          component="ConsentWithChanges"
        />
        <TileConductor
          isClosable
          component="MailFromTD"
        />
        <TileConductor
          isClosable
          account="savings"
          initialDeposit="1000"
          component="AccountOpening"
        />
        <TileConductor
          isClosable
          component="AccountProgressing"
        />
        <TileConductor
          isClosable
          component="TransactionFailing"
        />
        <TileConductor
          isClosable
          accounts={accounts}
          transactions={closestRecurringTransactions}
          component="ClosestUpcomingTransactions"
        />
        <TileConductor
          isClosable
          transaction={{ amount: 1000, date: '2017-02-27' }}
          nextTransaction={{ date: '2017-02-27' }}
          component="RecurringNotEnoughMoney"
        />
        <TileConductor
          isClosable
          initialDeposit="2000"
          balance="1000"
          component="InitialDepositFailingForm"
        />
      </div>
    );
  }
}

DashboardPage.displayName = 'DashboardPage';

DashboardPage.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object),
  closestRecurringTransactions: PropTypes.arrayOf(PropTypes.object),
};

DashboardPage.defaultProps = {
  accounts: [],
  closestRecurringTransactions: [],
};

export default connect(DashboardSelectors)(DashboardPage);
