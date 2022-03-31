import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Chain from "./reducers";

const store = createStore(Chain, applyMiddleware(thunk));

export default store;
