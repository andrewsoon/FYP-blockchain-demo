import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import Chain from "./reducers";

const store = createStore(Chain, composeWithDevTools(applyMiddleware(thunk)));

export default store;
