import update from 'react-addons-update';

import createReducer from '../utils/createReducer';

import {
  FUNDING_DEPOSIT_REQUEST, FUNDING_DEPOSIT_SUCCESS, FUNDING_DEPOSIT_FAILURE,
  FUNDING_TRANSFER_REQUEST, FUNDING_TRANSFER_SUCCESS, FUNDING_TRANSFER_FAILURE,
  FUNDING_WITHDRAW_REQUEST, FUNDING_WITHDRAW_SUCCESS, FUNDING_WITHDRAW_FAILURE,
} from '../actions/funding';

export const initialState = {
  transferIsLoading: false,
  transferIsSuccess: false,
  transferError: null,

  depositIsLoading: false,
  depositIsSuccess: false,
  depositError: null,

  withdrawIsLoading: false,
  withdrawIsSuccess: false,
  withdrawError: null,
};

export default createReducer({
  [FUNDING_DEPOSIT_REQUEST](state) {
    return update(state, { depositIsLoading: { $set: true } });
  },
  [FUNDING_DEPOSIT_SUCCESS](state, action) {
    return state;
  },
  [FUNDING_DEPOSIT_FAILURE](state, action) {
    return state;
  },

  [FUNDING_TRANSFER_REQUEST](state) {
    return update(state, { transferIsLoading: { $set: true } });
  },
  [FUNDING_TRANSFER_SUCCESS](state, action) {
    return state;
  },
  [FUNDING_TRANSFER_FAILURE](state, action) {
    return state;
  },

  [FUNDING_WITHDRAW_REQUEST](state) {
    return update(state, { withdrawIsLoading: { $set: true } });
  },
  [FUNDING_WITHDRAW_SUCCESS](state, action) {
    return state;
  },
  [FUNDING_WITHDRAW_FAILURE](state, action) {
    return state;
  },
}, initialState);
