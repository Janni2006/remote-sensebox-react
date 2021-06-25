import { VISIT, LANGUAGE, RENDERER, STATISTICS, PAGELOAD } from './types';
import axios from 'axios';

export const visitPage = () => (dispatch) => {
  dispatch({
    type: VISIT
  });
};

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
      var url = res.data;
      if (url) {
        dispatch({ type: PAGELOAD, payload: url });
      }
    },
    error: err => {
    }
  };
  if (process.env.React_APP_SAME_SERVER === "true") {
    axios.get(`${window.location.origin}/api/cam`, config)
      .then(res => {
        res.config.success(res);
      })
      .catch(err => {
        err.config.error(err);
      });
  } else {
    axios.get(`${process.env.REACT_APP_REMOTE_BACKEND}/api/cam`, config)
      .then(res => {
        res.config.success(res);
      })
      .catch(err => {
        err.config.error(err);
      });
  }
}
