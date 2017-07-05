import 'isomorphic-fetch';
import 'es6-promise/auto';

import assign from 'lodash/assign';

import { matchStrict } from './match';

function setUrl(url, type = 'main') {
  return matchStrict(type, {
    mock: [__APP_PROTOCOL__, '://', __APP_HOST__, ':', __APP_MOCK_PORT__, url],
    local: [__APP_PROTOCOL__, '://', __APP_HOST__, ':', (__APP_PORT__ || ''), url],
    main: [__API_PROTOCOL__, '://', __API_HOST__, url],
  }, [__API_PROTOCOL__, '://', __API_HOST__, url]).join('');
}

function setHeaders(headers = {}) {
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'access-token': localStorage.accessToken,
    client: localStorage.client,
    uid: localStorage.uid,
  };

  return assign({}, defaultHeaders, headers);
}

function setOptions(options) {
  const headers = setHeaders(options.headers);
  return assign({}, options, { headers });
}

function updateAuthHeaders(response) {
  if (response && response.headers.has('access-token')) {
    const { headers } = response;

    if (__CLIENT__) {
      localStorage.setItem('accessToken', headers.get('access_token'));
      localStorage.setItem('client', headers.get('client'));
      localStorage.setItem('uid', headers.get('uid'));
    }
  }

  return response;
}

function removeAuthHeader() {
  if (__CLIENT__) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('client');
    localStorage.removeItem('uid');
  }
}

function request(originUrl, originOptions) {
  return new Promise((resolve, reject) => {
    if (!originUrl) {
      return reject('There is no URL provided for the request.');
    }

    const url = setUrl(originUrl, originOptions.type);
    const options = setOptions(originOptions);

    return fetch(url, options)
      .then(response => updateAuthHeaders(response))
      .then(response => response.json())
      .then((response) => {
        if (!response) {
          return reject('Server does not respond.');
        }

        return resolve(response);
      })
      .catch((error) => {
        console.log('catch', error);
        console.log(JSON.stringify(error));
        return reject('Unexpected error.');
      });
  });
}

export default request;
