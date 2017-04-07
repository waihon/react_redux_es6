import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) == '_SUCCESS';
}

export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action) {
  // For simpler reducer like this, if is preferable to switch
  if (action.type == types.BEGIN_AJAX_CALL) {
    // Increase the number of AJAX calls
    return state + 1;
  } else if (action.type === types.AJAX_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)) {
    // Reduce the number of AJAX calls when succeeded or failed
    return state - 1;
  }

  return state;
}
