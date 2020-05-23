import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { MODULE_NAME as authModuleName, reducer as authReducer, setAuthSuccess } from "./auth";

import { MODULE_NAME as dataModuleName, reducer as dataReducer } from "./data";

const rootReducer = combineReducers({
  [authModuleName]: authReducer,
  [dataModuleName]: dataReducer
});
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);


async function checkLocalAuth() {
  const userInfo = await localStorage.getItem("Auth");
  if (userInfo) {
    store.dispatch(setAuthSuccess(JSON.parse(userInfo)));
  }
}
checkLocalAuth();

export default store;
