import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import application from '../reducers/application';
import user from '../reducers/user';

export default function configureReducers(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    form: formReducer,
    application,
    user,
    ...asyncReducers,
  });
}
