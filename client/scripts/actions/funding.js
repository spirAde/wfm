export const FUNDING_DEPOSIT = 'FUNDING_DEPOSIT';
export const FUNDING_DEPOSIT_REQUEST = 'FUNDING_DEPOSIT_REQUEST';
export const FUNDING_DEPOSIT_SUCCESS = 'FUNDING_DEPOSIT_SUCCESS';
export const FUNDING_DEPOSIT_FAILURE = 'FUNDING_DEPOSIT_FAILURE';

export const FUNDING_TRANSFER = 'FUNDING_TRANSFER';
export const FUNDING_TRANSFER_REQUEST = 'FUNDING_TRANSFER_REQUEST';
export const FUNDING_TRANSFER_SUCCESS = 'FUNDING_TRANSFER_SUCCESS';
export const FUNDING_TRANSFER_FAILURE = 'FUNDING_TRANSFER_FAILURE';

export const FUNDING_WITHDRAW = 'FUNDING_WITHDRAW';
export const FUNDING_WITHDRAW_REQUEST = 'FUNDING_WITHDRAW_REQUEST';
export const FUNDING_WITHDRAW_SUCCESS = 'FUNDING_WITHDRAW_SUCCESS';
export const FUNDING_WITHDRAW_FAILURE = 'FUNDING_WITHDRAW_FAILURE';

export function deposit({ amount, from, to }) {
  return (dispatch, getState) => {
    const state = getState();

    return dispatch({
      type: FUNDING_DEPOSIT,
      payload: {
        promise: new Promise(resolve => setTimeout(() => resolve(), 2000)),
      },
    });
  };
}

export function transfer({ amount, from, to }) {
  return (dispatch, getState) => {
    const state = getState();

    return dispatch({
      type: FUNDING_TRANSFER,
      payload: {
        promise: new Promise(resolve => setTimeout(() => resolve(), 2000)),
      },
    });
  };
}

export function withdraw({ amount, from, to }) {
  return (dispatch, getState) => {
    const state = getState();

    return dispatch({
      type: FUNDING_WITHDRAW,
      payload: {
        promise: new Promise(resolve => setTimeout(() => resolve(), 2000)),
      },
    });
  };
}