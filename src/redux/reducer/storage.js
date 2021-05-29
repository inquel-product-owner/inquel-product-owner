import { CONTENT, TEMP } from "../action";

let initialState = {
    content: null,
    temp: null,
};

const storageReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONTENT:
            return { ...state, content: action.payload };
        case TEMP:
            return { ...state, temp: action.payload };
        default:
            return state;
    }
};

export default storageReducer;
