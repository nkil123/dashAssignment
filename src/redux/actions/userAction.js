import {DEL_USER, SAVE_USER} from '../actionTypes';

export const saveUser = data => {
  return {
    type: SAVE_USER,
    payload: data,
  };
};

export const delUser = data => {
  return {
    type: DEL_USER,
    payload: data,
  };
};
