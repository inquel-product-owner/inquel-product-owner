import { EXAM_STATE } from "../action";

let initialState = {
    exam_state: {
        examStarted: false,
        id: "",
        type: "",
    },
};

const applicationReducer = (state = initialState, action) => {
    switch (action.type) {
        case EXAM_STATE:
            return { ...state, exam_state: action.payload };
        default:
            return state;
    }
};

export default applicationReducer;
