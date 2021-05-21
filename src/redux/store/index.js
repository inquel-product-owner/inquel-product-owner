import { combineReducers, createStore } from "redux";
import contentReducer from "../reducer/content";
import userReducer from "../reducer/user";

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch (e) {
        console.warn(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

const persistedState = loadFromLocalStorage();

const rootReducer = combineReducers({
    content: contentReducer,
    user: userReducer,
});

const store = createStore(
    rootReducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
    saveToLocalStorage(store.getState());
    console.log("subscribed");
});

export default store;
