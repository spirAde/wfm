import { createSelector } from 'reselect';

const transactionsSelector = state => state.transaction.accountTransactions.investment;

const AccountInvestmentSelectors = createSelector(
  transactionsSelector,
  (transactions) => ({
    transactions,
  }),
);

export default AccountInvestmentSelectors;
