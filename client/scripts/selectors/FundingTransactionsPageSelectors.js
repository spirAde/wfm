import { createSelector } from 'reselect';

const activeGroupIdSelector = state => state.recurring.activeGroupId;
const groupsSelector = state => state.recurring.groups;
const transactionsSelector = state => state.transaction.transactions;

const FundingTransactionsPageSelectors = createSelector(
  activeGroupIdSelector,
  groupsSelector,
  transactionsSelector,
  (activeGroupId, groups, transactions) => ({
    activeGroupId,
    groups,
    transactions,
  }),
);

export default FundingTransactionsPageSelectors;
