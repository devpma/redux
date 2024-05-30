import { applyMiddleware, createStore } from "redux";
import counterReducer from "./reducer";
import { thunk } from "redux-thunk";

const store = createStore(counterReducer, applyMiddleware(thunk));

export default store;
