import update from 'react-addons-update';

import createReducer from '../utils/createReducer';

import { CHECK_DEVICE, SET_VANARE_STATUS } from '../actions/application';

export const initialState = {
  isMobile: undefined,
  vanareIsDown: false,
};

export default createReducer({
  [CHECK_DEVICE](state, action) {
    return update(state, { isMobile: { $set: action.payload.isMobile } });
  },
  [SET_VANARE_STATUS](state, action) {
    return update(state, { vanareIsDown: { $set: action.payload.vanareIsDown } });
  },
}, initialState);
