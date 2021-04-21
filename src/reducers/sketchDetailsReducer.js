import { OPEN_DETAILS, CLOSE_DETAILS } from '../actions/types';

const initialState = {
    code: {
        sketch: "",
        xml: ""
    },
    name: "",
    show: false
};

export default function foo(state = initialState, action) {
    switch (action.type) {
        case OPEN_DETAILS:
            return {
                ...state,
                code: {
                    sketch: action.payload.sketch,
                    xml: action.payload.xml
                },
                name: action.payload.title,
                show: true
            }
        case CLOSE_DETAILS:
            return {
                ...state,
                code: {
                    sketch: "",
                    xml: ""
                },
                name: "",
                show: false
            }
        default:
            return state;
    }
}
