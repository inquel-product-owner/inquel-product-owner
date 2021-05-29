import store from "../store";

export default function storeDispatcher(action, data) {
    store.dispatch({ type: action, payload: data });
}
