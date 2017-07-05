import { createSelector } from 'reselect';

import { getClosestRecurringTransactions } from '../utils/helpers/recurring';

const accountsSelector = state => state.account.accounts;
const recurringGroupsSelector = state => state.recurring.groups;

const DashboardSelectors = createSelector(
  accountsSelector,
  recurringGroupsSelector,
  (accounts, recurringGroups) => ({
    accounts,
    closestRecurringTransactions: getClosestRecurringTransactions(recurringGroups),
  }),
);

export default DashboardSelectors;
