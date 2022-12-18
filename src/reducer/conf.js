import { LOAD_CONF_SUCCESS } from "../actions";
import userManager from "../utils/userManager";

const initialState = {
  conf: {},
  usermanager: {}
};

export default function configurationReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CONF_SUCCESS:
      newState = Object.assign({}, state, {
        conf: action.payload,
        usermanager: userManager(action.payload.data)
      });
      return newState;
    default:
      return state;
  }
}
