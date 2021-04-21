import { OPEN_DETAILS, CLOSE_DETAILS } from '../actions/types';

const initialState = {
    code: {
        sketch: "",
        xml: ""
    },
    name: "",
    id: "",
    blockly: false,
    show: false,
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
                id: action.payload.code,
                name: action.payload.title,
                blockly: action.payload.blockly,
                show: true
            }
        case CLOSE_DETAILS:
            return {
                ...state,
                code: {
                    sketch: "",
                    xml: ""
                },
                id: "",
                name: "",
                blockly: false,
                show: false
            }
        default:
            return state;
    }
}
