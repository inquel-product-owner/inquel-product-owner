let data = {
    subject_name: "Subject A1",
};

const subjectReducer = (state = data, action) => {
    switch (action.type) {
        case "GET":
            return state.subject_name;
        default:
            return state.subject_name;
    }
};

export default subjectReducer;
