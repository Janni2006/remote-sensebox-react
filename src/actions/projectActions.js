import { PROJECT_PROGRESS, GET_PROJECT, PROJECT_DESCRIPTION } from './types';

import axios from 'axios';
import { returnErrors, returnSuccess } from './messageActions';

export const getProject = (id) => (dispatch) => {
  dispatch({ type: PROJECT_PROGRESS });
  const config = {
    success: res => {
      var project = res.data;
      if (project) {
        dispatch({
          type: GET_PROJECT,
          payload: project
        });
        dispatch({
          type: PROJECT_DESCRIPTION,
          payload: project.description
        });
        dispatch({ type: PROJECT_PROGRESS });
        dispatch(returnSuccess(res.data.message, res.status, 'GET_PROJECT_SUCCESS'));
      }
      else {
        dispatch({ type: PROJECT_PROGRESS });
        dispatch(returnErrors(res.data.message, res.status, 'PROJECT_EMPTY'));
      }
    },
    error: err => {
      if (err.response) {
        dispatch(returnErrors(err.response.data.message, err.response.status, 'GET_PROJECT_FAIL'));
      }
      dispatch({ type: PROJECT_PROGRESS });
    }
  };
  axios.get(`${process.env.REACT_APP_REMOTE_BACKEND}/api/sketch/${id}`, config)
    .then(res => {
      res.config.success(res);
    })
    .catch(err => {
      err.config.error(err);
    });
};

export const resetProject = () => (dispatch) => {
  dispatch({
    type: GET_PROJECT,
    payload: {}
  });
};
