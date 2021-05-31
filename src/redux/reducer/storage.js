import { CONTENT, EXAMDATA, TEMP } from "../action";

let initialState = {
    content: {},
    temp: {},
    examData: {},
};

const storageReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONTENT:
            return { ...state, content: action.payload };
        case TEMP:
            return { ...state, temp: action.payload };
        case EXAMDATA:
            return { ...state, examData: action.payload };
        default:
            return state;
    }
};

export default storageReducer;
