import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import { reducer as oidcReducer } from "redux-oidc";
import dataReducer from "./data";
import configurationReducer from "./conf";

const reducer = combineReducers({
  routing: routerReducer,
  oidc: oidcReducer,
  data: dataReducer,
  conf: configurationReducer
});

export default reducer;
