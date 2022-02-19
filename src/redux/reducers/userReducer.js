import {DEL_USER, SAVE_USER} from '../actionTypes';

let init = {token: JSON.parse (localStorage.getItem ('token'))};

export const userReducer = (state = init, {type, payload}) => {
  switch (type) {
    case SAVE_USER:
      return {...state, token: payload.token};
    case DEL_USER:
      return {...state, token: payload.token};
    default:
      return state;
  }
};
