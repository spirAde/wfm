import 'isomorphic-fetch';

import assign from 'lodash/assign';

import request from '../utils/request';

const GET_MONEYTYPE_QUESTIONS = 'GET_MONEYTYPE_QUESTIONS';
export const GET_MONEYTYPE_QUESTIONS_REQUEST = 'GET_MONEYTYPE_QUESTIONS_REQUEST';
export const GET_MONEYTYPE_QUESTIONS_SUCCESS = 'GET_MONEYTYPE_QUESTIONS_SUCCESS';
export const GET_MONEYTYPE_QUESTIONS_FAILURE = 'GET_MONEYTYPE_QUESTIONS_FAILURE';

const GET_MONEYTYPE_CONTENT = 'GET_MONEYTYPE_CONTENT';
export const GET_MONEYTYPE_CONTENT_REQUEST = 'GET_MONEYTYPE_CONTENT_REQUEST';
export const GET_MONEYTYPE_CONTENT_SUCCESS = 'GET_MONEYTYPE_CONTENT_SUCCESS';
export const GET_MONEYTYPE_CONTENT_FAILURE = 'GET_MONEYTYPE_CONTENT_FAILURE';

const SEND_MONEYTYPE_ANSWER = 'SEND_MONEYTYPE_ANSWER';
export const SEND_MONEYTYPE_ANSWER_REQUEST = 'SEND_MONEYTYPE_ANSWER_REQUEST';
export const SEND_MONEYTYPE_ANSWER_SUCCESS = 'SEND_MONEYTYPE_ANSWER_SUCCESS';
export const SEND_MONEYTYPE_ANSWER_FAILURE = 'SEND_MONEYTYPE_ANSWER_FAILURE';

const FINISH_MONEYTYPE_ASSESSMENT = 'FINISH_MONEYTYPE_ASSESSMENT';
export const FINISH_MONEYTYPE_ASSESSMENT_REQUEST = 'FINISH_MONEYTYPE_ASSESSMENT_REQUEST';
export const FINISH_MONEYTYPE_ASSESSMENT_SUCCESS = 'FINISH_MONEYTYPE_ASSESSMENT_SUCCESS';
export const FINISH_MONEYTYPE_ASSESSMENT_FAILURE = 'FINISH_MONEYTYPE_ASSESSMENT_FAILURE';

const GET_MONEYTYPE_SHOW_TYPES = 'GET_MONEYTYPE_SHOW_TYPES';
export const GET_MONEYTYPE_SHOW_TYPES_REQUEST = 'GET_MONEYTYPE_SHOW_TYPES_REQUEST';
export const GET_MONEYTYPE_SHOW_TYPES_SUCCESS = 'GET_MONEYTYPE_SHOW_TYPES_SUCCESS';
export const GET_MONEYTYPE_SHOW_TYPES_FAILURE = 'GET_MONEYTYPE_SHOW_TYPES_FAILURE';

const UPDATE_MONEYTYPE_SHOW_TYPES = 'UPDATE_MONEYTYPE_SHOW_TYPES';
export const UPDATE_MONEYTYPE_SHOW_TYPES_REQUEST = 'UPDATE_MONEYTYPE_SHOW_TYPES_REQUEST';
export const UPDATE_MONEYTYPE_SHOW_TYPES_SUCCESS = 'UPDATE_MONEYTYPE_SHOW_TYPES_SUCCESS';
export const UPDATE_MONEYTYPE_SHOW_TYPES_FAILURE = 'UPDATE_MONEYTYPE_SHOW_TYPES_FAILURE';

export const FORCE_CLEAR_ANSWERS = 'FORCE_CLEAR_ANSWERS';

export function getMoneyTypeQuestions() {
  return {
    type: GET_MONEYTYPE_QUESTIONS,
    payload: {
      promise: request('/api/money_type/questions', {
        method: 'get',
      }),
    },
  };
}

export function getMoneyTypeContent() {
  return {
    type: GET_MONEYTYPE_CONTENT,
    payload: {
      promise: request('/api/money_type/content', {
        method: 'get',
      }),
    },
  };
}

export function getShowTypes() {
  return {
    type: GET_MONEYTYPE_SHOW_TYPES,
    payload: {
      promise: request('/api/money_type/archetype_choice', {
        method: 'get',
      }),
    },
  };
}

export function sendMoneyTypeAnswer(questionId, answer) {
  return {
    type: SEND_MONEYTYPE_ANSWER,
    payload: {
      promise: request(`/api/money_type/questions/${questionId}/answer`, {
        method: 'post',
        body: JSON.stringify({
          answer,
        }),
      }),
    },
  };
}

export function finishAssessment() {
  return dispatch => dispatch({
    type: FINISH_MONEYTYPE_ASSESSMENT,
    payload: {
      promise: new Promise(resolve => setTimeout(() => resolve(), 2000)),
    },
  }).then(() => {
    //dispatch(getMoneyTypeQuestions()); // force reset questions-answers
    //dispatch(getMoneyTypeContent());
    //dispatch(getShowTypes());
  });
}

export function updateShowTypes(type) {
  return (dispatch, getState) => {
    const state = getState();
    const currentTypeState = state.moneytype.showTypes[type];

    return dispatch({
      type: UPDATE_MONEYTYPE_SHOW_TYPES,
      payload: {
        promise: request('/api/money_type/update_archetype_choice', {
          method: 'put',
          body: JSON.stringify({
            type,
            state: !currentTypeState,
          }),
        }),
      },
      meta: {
        type,
        state: !currentTypeState,
      },
    });
  };
}

export function downloadPDF() {
  const options = {};

  options.headers = {
    'access-token': localStorage.accessToken,
    uid: localStorage.uid,
    client: localStorage.client,
  };

  return fetch(`${__API_PROTOCOL__}://${__API_HOST__}/api/money_type/report`, options)
    .then(response => response.arrayBuffer());
}

export function forceClearAnswers() {
  return (dispatch, getState) => {
    const state = getState();
    const { questions } = state.moneytype;

    const cleared = questions.map(question => assign(question, { answer: null }));

    return dispatch({
      type: FORCE_CLEAR_ANSWERS,
      payload: {
        data: cleared,
      },
    });
  };
}
