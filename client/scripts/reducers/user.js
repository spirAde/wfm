import createReducer from '../utils/createReducer';

export const initialState = {
  isLoggedIn: false,
  moneyTypeStats: {
    visionary: 34,
    producer: 56,
    nurturer: 12,
    epicure: 100,
    independent: 78,
  },
};

export default createReducer({}, initialState);
