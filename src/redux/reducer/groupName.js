let data = {
    group_name: "Group",
    subject_name: "Subject",
    chapter_name: "Chapter",
    topic_name: "Topic",
    cycle_name: "Cycle test",
    semester_name: "Semester",
    section_name: "Section",
};

const groupReducer = (state = data, action) => {
    switch (action.type) {
        case "GROUP":
            return { ...state, group_name: action.payload };
        case "SUBJECT":
            return { ...state, subject_name: action.payload };
        case "CHAPTER":
            return { ...state, chapter_name: action.payload };
        case "TOPIC":
            return { ...state, topic_name: action.payload };
        case "CYCLE":
            return { ...state, cycle_name: action.payload };
        case "SEMESTER":
            return { ...state, semester_name: action.payload };
        case "SECTION":
            return { ...state, section_name: action.payload };
        default:
            return state;
    }
};

export default groupReducer;
