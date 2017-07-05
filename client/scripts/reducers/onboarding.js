import update from 'react-addons-update';
import createReducer from '../utils/createReducer';

import { CHANGE_STEP, ALLOW_NEW_STEP, SAVE_FORM_VALUES } from '../actions/onboarding';

export const initialState = {
  navigation: [
    {
      text: 'About you',
      steps: [
        '/newaccount/basicinfo',
        '/survey/employment',
        '/survey/risks',
      ],
    },
    {
      text: 'Fund account',
      steps: [
        '/survey/banks',
        '/survey/check',
        '/survey/accounts',
      ],
    },
    {
      text: 'Confirm & Sign',
      steps: [
        '/survey/docusign',
        '',
        '',
      ],
    },
    {
      text: 'You’re done!',
      steps: [],
    },
  ],
  currentStep: [0, 2],
  availableStep: [0, 1],
  formValues: {
    welcome: {},
    basicinfo: {},
    employment: {},
    risks: {},
    check: {},
    accounts: {},
  },
};

export default createReducer({
  [CHANGE_STEP](state, action) {
    return update(state, { currentStep: { $set: action.payload.step } });
  },
  [ALLOW_NEW_STEP](state, action) {
    return update(state, { availableStep: { $set: action.payload.step } });
  },
  [SAVE_FORM_VALUES](state, action) {
    const { key, values } = action.payload;
    return update(state, {
      formValues: { [key]: { $set: values } },
    });
  },
}, initialState);
