import moment from 'moment';

import request from '../utils/request';

import { getUpcomingTransactions, clearUpcomingTransactions } from './recurring';

const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
export const GET_TRANSACTIONS_REQUEST = 'GET_TRANSACTIONS_REQUEST';
export const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS';
export const GET_TRANSACTIONS_FAILURE = 'GET_TRANSACTIONS_FAILURE';

const GET_ACCOUNT_TRANSACTIONS = 'GET_ACCOUNT_TRANSACTIONS';
export const GET_ACCOUNT_TRANSACTIONS_REQUEST = 'GET_ACCOUNT_TRANSACTIONS_REQUEST';
export const GET_ACCOUNT_TRANSACTIONS_SUCCESS = 'GET_ACCOUNT_TRANSACTIONS_SUCCESS';
export const GET_ACCOUNT_TRANSACTIONS_FAILURE = 'GET_ACCOUNT_TRANSACTIONS_FAILURE';

const GET_ANY_SUCCESS_WITHDRAW_TRANSACTION = 'GET_ANY_SUCCESS_WITHDRAW_TRANSACTION';
export const GET_ANY_SUCCESS_WITHDRAW_TRANSACTION_REQUEST = 'GET_ANY_SUCCESS_WITHDRAW_TRANSACTION_REQUEST';
export const GET_ANY_SUCCESS_WITHDRAW_TRANSACTION_SUCCESS = 'GET_ANY_SUCCESS_WITHDRAW_TRANSACTION_SUCCESS';
export const GET_ANY_SUCCESS_WITHDRAW_TRANSACTION_FAILURE = 'GET_ANY_SUCCESS_WITHDRAW_TRANSACTION_FAILURE';

export const CLEAR_TRANSACTIONS = 'CLEAR_TRANSACTIONS';

export function clearTransactions() {
  return {
    type: CLEAR_TRANSACTIONS,
  };
}

export function getTransactions(params) {
  return (dispatch, getState) => {
    /*const state = getState();
    const accounts = state.account.get('accounts');

    dispatch(clearUpcomingTransactions());

    // if status is scheduled then we need only recurring upcoming transactions
    if (params && params.status === 'scheduled') {
      const options = {
        startDate: params.startDate || null,
        endDate: params.endDate || null,
        accountId: params.accountType && params.accountType !== 'all'
          ? accounts.getIn([params.accountType, 'id'])
          : null,
      };

      dispatch(clearTransactions());
      dispatch(getUpcomingTransactions(options));
      return false;
    } else if (params && (params.startDate || params.endDate)) {
      const isAvailableStatus = params.status === '' || params.status === 'all' || params.status === 'scheduled';
      const isAvailableInterval = moment().isBefore(params.startDate, 'MM/DD/YYYY') || moment().isBefore(params.endDate, 'MM/DD/YYYY');

      if (isAvailableStatus && isAvailableInterval) {
        const options = {
          startDate: params.startDate || null,
          endDate: params.endDate || null,
          accountId: params.accountType && params.accountType !== 'all'
            ? accounts.getIn([params.accountType, 'id'])
            : null,
        };

        dispatch(getUpcomingTransactions(options));
      }
    }

    const availableStatuses = {
      completed: ['complete'],
      canceled: ['not_enough_money', 'rejected'],
      processing: ['pending_account_activation', 'ready_to_process', 'pending_on_vanare', 'vanare_timeout'],
    };

    const defaultParams = [
      'predicate=desc',
      'limit=10',
      'order_field=created_at',
    ];

    const additionalParams = [];

    if (params) {
      const { status, accountType, type, startDate, endDate, page } = params;

      if (status && status !== '' && status !== 'all' && status !== 'scheduled') {
        const statuses = availableStatuses[status].map(status => `status[]=${status}`).join('&');

        additionalParams.push(statuses);
      }
      if (accountType && accountType !== '' && accountType !== 'all') {
        additionalParams.push(`account_id=${accounts.getIn([accountType, 'id'])}`);
      }
      if (type && type !== '' && type !== 'all') {
        additionalParams.push(`type=${type}`);
      }
      if (startDate) {
        additionalParams.push(`start_date=${startDate}`);
      }
      if (endDate) {
        additionalParams.push(`end_date=${endDate}`);
      }
      if (page) {
        additionalParams.push(`page=${page}`);
      }
    }

    const requestParams = defaultParams.concat(additionalParams).join('&');*/

    return dispatch({
      type: GET_TRANSACTIONS,
      payload: {
        /*promise: request(`/api/users/fund_actions?${requestParams}`, {
          method: 'get',
        }),*/
        promise: new Promise(resolve => setTimeout(() => resolve(), 2000)),
      },
      meta: {
        isScheduled: params && params.status === 'scheduled',
      },
    });
  };
}

export function getAccountTransactions(accountType, limit = 10) {
  return (dispatch, getState) => {
    const state = getState();
    //const accountId = state.account.getIn(['accounts', accountType, 'id']);

    return dispatch({
      type: GET_ACCOUNT_TRANSACTIONS,
      payload: {
        promise: request(`/api/users/fund_actions?account_id=${accountType}&predicate=desc&limit=${limit}&order_field=created_at`, {
          method: 'get',
          type: 'mock',
        }),
      },
      meta: {
        accountType,
      },
    });
  };
}

export function checkAnySuccessWithdrawTransaction() {
  return (dispatch, getState) => {
    const state = getState();
    const accountId = state.account.getIn(['accounts', 'retirement', 'id']);

    const currentYear = moment().get('year');
    const params = [
      'type[]=withdraw',
      'type[]=internal',
      `account_id=${accountId}`,
      `ira_fund_date=${currentYear}`,
      'limit=1',
      'status=complete',
    ].join('&');

    return dispatch({
      type: GET_ANY_SUCCESS_WITHDRAW_TRANSACTION,
      payload: {
        promise: request(`/api/users/fund_actions?${params}`, {
          method: 'get',
        }),
      },
    });
  };
}
