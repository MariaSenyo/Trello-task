import {createStore} from "redux";
import rootReducer from "../reducers/reducers";

// const reducer = () =>{}

const store = createStore(rootReducer);

export default store;