import { createSelector } from 'reselect';

const transactionsSelector = state => state.transaction.accountTransactions.savings;

const AccountSavingsSelectors = createSelector(
  transactionsSelector,
  (transactions) => ({
    transactions,
  }),
);

export default AccountSavingsSelectors;
