/* Aquí se combinan todos los reducers */

import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { uiReducer } from "./uiReducer";
import { requestReducer } from "./requestReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    reqs: requestReducer
});