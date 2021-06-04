import { RESPONSE, EXAMDATA, TEMP } from "../action";

let initialState = {
    response: {},
    temp: {},
    examData: {},
};

const storageReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESPONSE:
            return { ...state, response: action.payload };
        case TEMP:
            return { ...state, temp: action.payload };
        case EXAMDATA:
            return { ...state, examData: action.payload };
        default:
            return state;
    }
};

export default storageReducer;
