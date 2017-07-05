import React, { PropTypes } from 'react';
import { createAsyncComponent } from 'react-async-component';

import { match } from '../../utils/match';

import sectionTypes from './types';

import { Section, Spinner } from '../UI';

const SectionConductor = ({
  component,
  style,
  sectionClassName,
  border,
  borderColor,
  borderWidth,
  zeroPadding,
  ...props
}) => {
  // TODO: refactoring this after updating to webpack2, use import
  const SectionComponent = createAsyncComponent({
    resolve: () => new Promise(resolve => match(component, {
      DashboardBalance: () => require.ensure(
        ['../DashboardBalance/DashboardBalance'],
        require => resolve(require('../DashboardBalance/DashboardBalance')),
        'dashboard-balance',
      ),
      AccountBalance: () => require.ensure(
        ['../AccountBalance/AccountBalance'],
        require => resolve(require('../AccountBalance/AccountBalance')),
        'account-balance',
      ),
      Fees: () => require.ensure(
        ['../Fees/Fees'],
        require => resolve(require('../Fees/Fees')),
        'fees',
      ),
      PerformanceChart: () => require.ensure(
        ['../PerformanceChart/PerformanceChart'],
        require => resolve(require('../PerformanceChart/PerformanceChart')),
        'performance-chart',
      ),
      FundingDepositForm: () => require.ensure(
        ['../FundingDepositForm/FundingDepositForm'],
        require => resolve(require('../FundingDepositForm/FundingDepositForm')),
        'funding-deposit-form',
      ),
      FundingTransferForm: () => require.ensure(
        ['../FundingTransferForm/FundingTransferForm'],
        require => resolve(require('../FundingTransferForm/FundingTransferForm')),
        'funding-transfer-form',
      ),
      FundingWithdrawForm: () => require.ensure(
        ['../FundingWithdrawForm/FundingWithdrawForm'],
        require => resolve(require('../FundingWithdrawForm/FundingWithdrawForm')),
        'funding-withdraw-form',
      ),
      ActivationRetirementForm: () => require.ensure(
        ['../ActivationRetirementForm/ActivationRetirementForm'],
        require => resolve(require('../ActivationRetirementForm/ActivationRetirementForm')),
        'activation-retirement-form',
      ),
      MoneyTypeAssessmentForm: () => require.ensure(
        ['../MoneyTypeAssessmentForm/MoneyTypeAssessmentForm'],
        require => resolve(require('../MoneyTypeAssessmentForm/MoneyTypeAssessmentForm')),
        'moneytype-assessment-form',
      ),
      MoneyTypeReport: () => require.ensure(
        ['../MoneyTypeReport/MoneyTypeReport'],
        require => resolve(require('../MoneyTypeReport/MoneyTypeReport')),
        'moneytype-report',
      ),
      HoldingsList: () => require.ensure(
        ['../HoldingsList/HoldingsList'],
        require => resolve(require('../HoldingsList/HoldingsList')),
        'holdings-list',
      ),
      TransactionsList: () => require.ensure(
        ['../TransactionsList/TransactionsList'],
        require => resolve(require('../TransactionsList/TransactionsList')),
        'transactions-list',
      ),
      TransactionsFilter: () => require.ensure(
        ['../TransactionsFilter/TransactionsFilter'],
        require => resolve(require('../TransactionsFilter/TransactionsFilter')),
        'transactions-filter',
      ),
      RecurringTransactionsList: () => require.ensure(
        ['../RecurringTransactionsList/RecurringTransactionsList'],
        require => resolve(require('../RecurringTransactionsList/RecurringTransactionsList')),
        'recurring-transactions-list',
      ),
    }, () => {})),
    Loading: () => <Spinner />,
  });

  // TODO: check if SectionComponent, TileComponent, ModalComponent doesn't load
  return (
    <Section
      border={border}
      borderColor={borderColor}
      borderWidth={borderWidth}
      sectionClassName={sectionClassName}
      zeroPadding={zeroPadding}
      style={style}
    >
      <SectionComponent {...props} />
    </Section>
  );
};

SectionConductor.displayName = 'SectionConductor';

SectionConductor.propTypes = {
  ...Section.propTypes,
  component: PropTypes.oneOf(sectionTypes),
};

SectionConductor.defaultProps = {
  component: '',
};

export default SectionConductor;
