import React, { PropTypes } from 'react';
import { createAsyncComponent } from 'react-async-component';

import { match } from '../../utils/match';

import tileTypes from './types';

import { Tile, Spinner } from '../UI';

const TileConductor = ({
  component,
  isClosable,
  tileClassName,
  style,
  onHide,
  eyebrow,
  ...props
}) => {
  // TODO: refactoring this after updating to webpack2, use import
  const TileComponent = createAsyncComponent({
    resolve: () => new Promise(resolve => match(component, {
      DashboardBalance: () => require.ensure(
        ['../DashboardBalance/DashboardBalance'],
        require => resolve(require('../DashboardBalance/DashboardBalance')),
        'dashboard-balance',
      ),
      MoneyTypeTakeAssessment: () => require.ensure(
        ['../MoneyTypeTakeAssessment/MoneyTypeTakeAssessment'],
        require => resolve(require('../MoneyTypeTakeAssessment/MoneyTypeTakeAssessment')),
        'moneytype-take-assessment',
      ),
      ConsentWithChanges: () => require.ensure(
        ['../ConsentWithChanges/ConsentWithChanges'],
        require => resolve(require('../ConsentWithChanges/ConsentWithChanges')),
        'consent-with-changes',
      ),
      MailFromTD: () => require.ensure(
        ['../MailFromTD/MailFromTD'],
        require => resolve(require('../MailFromTD/MailFromTD')),
        'mail-from-td',
      ),
      AccountOpening: () => require.ensure(
        ['../AccountOpening/AccountOpening'],
        require => resolve(require('../AccountOpening/AccountOpening')),
        'account-opening',
      ),
      AccountProgressing: () => require.ensure(
        ['../AccountProgressing/AccountProgressing'],
        require => resolve(require('../AccountProgressing/AccountProgressing')),
        'account-progressing',
      ),
      TransactionFailing: () => require.ensure(
        ['../TransactionFailing/TransactionFailing'],
        require => resolve(require('../TransactionFailing/TransactionFailing')),
        'transaction-failing',
      ),
      ClosestUpcomingTransactions: () => require.ensure(
        ['../ClosestUpcomingTransactions/ClosestUpcomingTransactions'],
        require => resolve(require('../ClosestUpcomingTransactions/ClosestUpcomingTransactions')),
        'closest-upcoming-transactions',
      ),
      RecurringNotEnoughMoney: () => require.ensure(
        ['../RecurringNotEnoughMoney/RecurringNotEnoughMoney'],
        require => resolve(require('../RecurringNotEnoughMoney/RecurringNotEnoughMoney')),
        'recurring-not-enough-money',
      ),
      InitialDepositFailingForm: () => require.ensure(
        ['../InitialDepositFailingForm/InitialDepositFailingForm'],
        require => resolve(require('../InitialDepositFailingForm/InitialDepositFailingForm')),
        'Initial-deposit-failing-form',
      ),
    }, () => {})),
    Loading: () => <Spinner />,
  });

  return (
    <Tile
      isClosable={isClosable}
      tileClassName={tileClassName}
      style={style}
      onHide={onHide}
      eyebrow={eyebrow}
    >
      <TileComponent onHide={onHide} {...props} />
    </Tile>
  );
};

TileConductor.displayName = 'TileConductor';

TileConductor.propTypes = {
  ...Tile.propTypes,
  component: PropTypes.oneOf(tileTypes),
};

TileConductor.defaultProps = {
  component: '',
};

export default TileConductor;
