export const CHANGE_STEP = 'CHANGE_STEP';
export const ALLOW_NEW_STEP = 'ALLOW_NEW_STEP';
export const SAVE_FORM_VALUES = 'SAVE_FORM_VALUES';

export function changeStep(step) {
  return {
    type: CHANGE_STEP,
    payload: {
      step,
    },
  };
}

export function allowNewStep(step) {
  return {
    type: ALLOW_NEW_STEP,
    payload: {
      step,
    },
  };
}

export function saveFormValues(formName, key) {
  return (dispatch, getState) => {
    const state = getState();
    const values = state.form[formName].values;

    return dispatch({
      type: SAVE_FORM_VALUES,
      payload: {
        values,
        key,
      },
    });
  };
}
