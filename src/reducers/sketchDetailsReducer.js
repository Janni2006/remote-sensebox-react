import { OPEN_DETAILS, CLOSE_DETAILS } from '../actions/types';

const initialState = {
    code: {
        sketch: "",
        xml: ""
    },
    name: "",
    id: "",
    error: false,
    error_msg: "",
    serial: "",
    finished: false,
    blockly: false,
    running: false,
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
                error: action.payload.error,
                error_msg: action.payload.error_msg,
                serial: action.payload.serial,
                finished: action.payload.finished,
                blockly: action.payload.blockly,
                running: action.payload.running,
                show: true,
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
                error: "",
                error_msg: "",
                serial: "",
                finished: false,
                blockly: false,
                running: false,
                show: false
            }
        default:
            return state;
    }
}
