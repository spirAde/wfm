const GET_RECURRING_TRANSACTION_GROUPS = 'GET_RECURRING_TRANSACTION_GROUPS';
export const GET_RECURRING_TRANSACTION_GROUPS_REQUEST = 'GET_RECURRING_TRANSACTION_GROUPS_REQUEST';
export const GET_RECURRING_TRANSACTION_GROUPS_SUCCESS = 'GET_RECURRING_TRANSACTION_GROUPS_SUCCESS';
export const GET_RECURRING_TRANSACTION_GROUPS_FAILURE = 'GET_RECURRING_TRANSACTION_GROUPS_FAILURE';

const CREATE_RECURRING_TRANSACTION_GROUP = 'CREATE_RECURRING_TRANSACTION_GROUP';
export const CREATE_RECURRING_TRANSACTION_GROUP_REQUEST = 'CREATE_RECURRING_TRANSACTION_GROUP_REQUEST';
export const CREATE_RECURRING_TRANSACTION_GROUP_SUCCESS = 'CREATE_RECURRING_TRANSACTION_GROUP_SUCCESS';
export const CREATE_RECURRING_TRANSACTION_GROUP_FAILURE = 'CREATE_RECURRING_TRANSACTION_GROUP_FAILURE';

const UPDATE_RECURRING_TRANSACTION_GROUP = 'UPDATE_RECURRING_TRANSACTION_GROUP';
export const UPDATE_RECURRING_TRANSACTION_GROUP_REQUEST = 'UPDATE_RECURRING_TRANSACTION_GROUP_REQUEST';
export const UPDATE_RECURRING_TRANSACTION_GROUP_SUCCESS = 'UPDATE_RECURRING_TRANSACTION_GROUP_SUCCESS';
export const UPDATE_RECURRING_TRANSACTION_GROUP_FAILURE = 'UPDATE_RECURRING_TRANSACTION_GROUP_FAILURE';

const CANCEL_RECURRING_TRANSACTION_GROUP = 'CANCEL_RECURRING_TRANSACTION_GROUP';
export const CANCEL_RECURRING_TRANSACTION_GROUP_REQUEST = 'CANCEL_RECURRING_TRANSACTION_GROUP_REQUEST';
export const CANCEL_RECURRING_TRANSACTION_GROUP_SUCCESS = 'CANCEL_RECURRING_TRANSACTION_GROUP_SUCCESS';
export const CANCEL_RECURRING_TRANSACTION_GROUP_FAILURE = 'CANCEL_RECURRING_TRANSACTION_GROUP_FAILURE';

const UPDATE_RECURRING_TRANSACTION = 'UPDATE_RECURRING_TRANSACTION';
export const UPDATE_RECURRING_TRANSACTION_REQUEST = 'UPDATE_RECURRING_TRANSACTION_REQUEST';
export const UPDATE_RECURRING_TRANSACTION_SUCCESS = 'UPDATE_RECURRING_TRANSACTION_SUCCESS';
export const UPDATE_RECURRING_TRANSACTION_FAILURE = 'UPDATE_RECURRING_TRANSACTION_FAILURE';

const CANCEL_RECURRING_TRANSACTION = 'CANCEL_RECURRING_TRANSACTION';
export const CANCEL_RECURRING_TRANSACTION_REQUEST = 'CANCEL_RECURRING_TRANSACTION_REQUEST';
export const CANCEL_RECURRING_TRANSACTION_SUCCESS = 'CANCEL_RECURRING_TRANSACTION_SUCCESS';
export const CANCEL_RECURRING_TRANSACTION_FAILURE = 'CANCEL_RECURRING_TRANSACTION_FAILURE';

const GET_RECURRING_FAILED_TRANSACTION = 'GET_RECURRING_FAILED_TRANSACTION';
export const GET_RECURRING_FAILED_TRANSACTION_REQUEST = 'GET_RECURRING_FAILED_TRANSACTION_REQUEST';
export const GET_RECURRING_FAILED_TRANSACTION_SUCCESS = 'GET_RECURRING_FAILED_TRANSACTION_SUCCESS';
export const GET_RECURRING_FAILED_TRANSACTION_FAILURE = 'GET_RECURRING_FAILED_TRANSACTION_FAILURE';

const REMOVE_RECURRING_FAILED_TRANSACTION = 'REMOVE_RECURRING_FAILED_TRANSACTION';
export const REMOVE_RECURRING_FAILED_TRANSACTION_REQUEST = 'REMOVE_RECURRING_FAILED_TRANSACTION_REQUEST';
export const REMOVE_RECURRING_FAILED_TRANSACTION_SUCCESS = 'REMOVE_RECURRING_FAILED_TRANSACTION_SUCCESS';
export const REMOVE_RECURRING_FAILED_TRANSACTION_FAILURE = 'REMOVE_RECURRING_FAILED_TRANSACTION_FAILURE';

const GET_UPCOMING_TRANSACTIONS = 'GET_UPCOMING_TRANSACTIONS';
export const GET_UPCOMING_TRANSACTIONS_REQUEST = 'GET_UPCOMING_TRANSACTIONS_REQUEST';
export const GET_UPCOMING_TRANSACTIONS_SUCCESS = 'GET_UPCOMING_TRANSACTIONS_SUCCESS';
export const GET_UPCOMING_TRANSACTIONS_FAILURE = 'GET_UPCOMING_TRANSACTIONS_FAILURE';

export const SET_ACTIVE_RECURRING_GROUP_ID = 'SET_ACTIVE_RECURRING_GROUP_ID';
export const CLEAR_UPCOMING_TRANSACTIONS = 'CLEAR_UPCOMING_TRANSACTIONS';

export function getRecurringTransactionGroups() {
  return {
    type: GET_RECURRING_TRANSACTION_GROUPS,
    payload: {
      /*promise: request(`/api/recurring_transaction_groups`, {
        method: 'get',
      }),*/
      promise: new Promise(resolve => setTimeout(() => resolve(), 2000)),
    },
  };
}

export function createRecurringTransactionGroup(data) {
  return {
    type: CREATE_RECURRING_TRANSACTION_GROUP,
    payload: {
      /*promise: request(`/api/recurring_transaction_groups`, {
        method: 'post',
        body: JSON.stringify(data),
      }),*/
      promise: new Promise(resolve => setTimeout(() => resolve(), 2000)),
    },
  };
}

export function updateRecurringTransactionGroup(id, data) {
  return {
    type: UPDATE_RECURRING_TRANSACTION_GROUP,
    payload: {
      /*promise: request(`/api/recurring_transaction_groups/${id}`, {
        method: 'put',
        body: JSON.stringify(data),
      }),*/
      promise: new Promise(resolve => setTimeout(() => resolve(), 2000)),
    },
  };
}

export function cancelRecurringTransactionGroup(id) {
  return {
    type: CANCEL_RECURRING_TRANSACTION_GROUP,
    payload: {
      /*promise: request(`/api/recurring_transaction_groups/${id}`, {
        method: 'delete',
      }),*/
      promise: new Promise(resolve => setTimeout(() => resolve(), 2000)),
    },
  };
}

export function updateRecurringTransaction(groupId, transactionId, data) {
  return {
    type: UPDATE_RECURRING_TRANSACTION,
    payload: {
      /*promise: request(`/api/recurring_transaction_groups/${groupId}/upcoming_transactions/${transactionId}`, {
        method: 'put',
        body: JSON.stringify(data),
      }),*/
      promise: new Promise(resolve => setTimeout(() => resolve(), 2000)),
    },
    meta: {
      groupId,
    },
  };
}

export function cancelRecurringTransaction(groupId, transactionId) {
  return {
    type: CANCEL_RECURRING_TRANSACTION,
    payload: {
      /*promise: request(`/api/recurring_transaction_groups/${groupId}/upcoming_transactions/${transactionId}/cancel`, {
        method: 'post',
      }),*/
      promise: new Promise(resolve => setTimeout(() => resolve(), 2000)),
    },
    meta: {
      groupId,
    },
  };
}

export function shouldLoadRecurringTransactionGroups() {
  return (dispatch, getState) => {
    const state = getState();
    const recurring = state.account.get('recurring');

    const worthFMStatus = state.auth.getIn(['user', 'worthFMStatus']);
    const accountIsOpen = worthFMStatus === 'account_open';

    return (!recurring || !recurring.size) && accountIsOpen;
  };
}

export function getRecurringFailedTransaction() {
  return {
    type: GET_RECURRING_FAILED_TRANSACTION,
    payload: {
      /*promise: request(`/api/not_enough_money_for_recurring_transaction_events`, {
        method: 'get',
      }),*/
      promise: new Promise(resolve => setTimeout(() => resolve(), 2000)),
    },
  };
}

export function removeRecurringFailedTransaction() {
  return (dispatch, getState) => {
    const state = getState();

    const eventId = state.account.getIn(['recurringFailedTransaction', 'id']);

    dispatch({
      type: REMOVE_RECURRING_FAILED_TRANSACTION,
      payload: {
        /*promise: request(`/api/not_enough_money_for_recurring_transaction_events/${eventId}`, {
          method: 'delete',
        }),*/
        promise: new Promise(resolve => setTimeout(() => resolve(), 2000)),
      },
    });
  };
}

// get id or null
export function setActiveRecurringGroupId(groupId) {
  return {
    type: SET_ACTIVE_RECURRING_GROUP_ID,
    payload: {
      id: groupId,
    },
  };
}


export function getUpcomingTransactions(params) {
  return {
    type: GET_UPCOMING_TRANSACTIONS,
    payload: {
      /*promise: request('/api/upcoming_transactions', {
        method: 'get',
      }),*/
      promise: new Promise(resolve => setTimeout(() => resolve(), 2000)),
    },
    meta: {
      ...params,
    },
  };
}

export function clearUpcomingTransactions() {
  return {
    type: CLEAR_UPCOMING_TRANSACTIONS,
  };
}
