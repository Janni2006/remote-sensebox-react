import { PROJECT_PROGRESS, GET_PROJECT, } from '../actions/types';

const initialState = {
  project: {},
  progress: false
};

export default function foo(state = initialState, action) {
  switch (action.type) {
    case PROJECT_PROGRESS:
      return {
        ...state,
        progress: !state.progress
      }
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload
      }
    default:
      return state;
  }
}
