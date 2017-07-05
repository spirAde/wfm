import update from 'react-addons-update';

import createReducer from '../utils/createReducer';

export const initialState = {
  accounts: [
    { type: 'savings', number: '1638', account: '901132360' },
    { type: 'investment', number: '1639', account: '901336860' },
    { type: 'retirement', number: '1640', account: '901504160' },
  ],
};

export default createReducer({
  //
}, initialState);
