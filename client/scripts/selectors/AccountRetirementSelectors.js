import { createSelector } from 'reselect';

const transactionsSelector = state => state.transaction.accountTransactions.retirement;

const AccountRetirementSelectors = createSelector(
  transactionsSelector,
  (transactions) => ({
    transactions,
  }),
);

export default AccountRetirementSelectors;
