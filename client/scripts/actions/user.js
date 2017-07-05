import request from '../utils/request';

const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

export function signin(email, password) {
  const action = {
    type: SIGN_IN,
    payload: {
      promise: request('/api/auth/sign_in', {
        method: 'post',
        body: JSON.stringify({
          email,
          password,
        }),
      }),
    },
  };

  return dispatch => dispatch(action)
    .then(data => console.log(data))
    .catch(error => console.log(error));
}
