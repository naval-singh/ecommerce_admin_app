import thunk from "redux-thunk";
import rootReducer from "../reducers";
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from "redux";

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
));

export default store;
