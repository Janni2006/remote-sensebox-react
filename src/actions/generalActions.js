import { VISIT, LANGUAGE, RENDERER, STATISTICS, PAGELOAD } from './types';
import axios from 'axios';

export const visitPage = () => (dispatch) => {
  dispatch({
    type: VISIT
  });
};

export const setInitial = () => (dispatch) => {
  
}

export const setLanguage = (language) => (dispatch, getState) => {
  window.localStorage.setItem('locale', language);

  dispatch({
    type: LANGUAGE,
    payload: language
  });
};

export const setRenderer = (renderer) => (dispatch) => {
  dispatch({
    type: RENDERER,
    payload: renderer
  });
};

export const setStatistics = (showStatistics) => (dispatch) => {
  dispatch({
    type: STATISTICS,
    payload: showStatistics
  });
};

export const onPageLoad = () => (dispatch) => {
  const config = {
    success: res => {
      if (res.data) {
        dispatch({ type: PAGELOAD, payload: res.data });
      }
    },
    error: err => {
    }
  };
  if (process.env.React_APP_SAME_SERVER === "true") {
    axios.get(`${window.location.origin}/api/initial`, config)
      .then(res => {
        res.config.success(res);
      })
      .catch(err => {
        err.config.error(err);
      });
  } else {
    axios.get(`${process.env.REACT_APP_REMOTE_BACKEND}/api/initial`, config)
      .then(res => {
        res.config.success(res);
      })
      .catch(err => {
        err.config.error(err);
      });
  }
}
