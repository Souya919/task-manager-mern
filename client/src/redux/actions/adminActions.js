import axios from 'axios';
import * as actions from './actionTypes';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';
// get all users
export const getAllUsers = () => (dispatch, getState) => {
  dispatch(setUsersLoading());
  axios
    .get('/api/admin/get-all-user', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: actions.GET_ALL_USERS,
        payload: res.data.users,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// get all logs
export const getAllLogs = () => (dispatch, getState) => {
  dispatch(setUsersLoading());
  axios
    .get('/api/admin/get-logs', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: actions.GET_ALL_LOGS,
        payload: res.data.doc,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const addUser = (body) => (dispatch, getState) => {
  axios
    .post('api/admin/create-user', body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: actions.SAVE_USER,
        payload: res.data.newUser,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'ADD_USER_FAIL')
      );
    });
};

export const updateUser = (id, body) => (dispatch, getState) => {
  axios
    .post(`api/admin/${id}`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: actions.UPDATE_USER,
        payload: res.data.user,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'ADD_USER_FAIL')
      );
    });
};

export const changeStatus = (id) => (dispatch, getState) => {
  axios
    .get(`/api/admin/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: actions.SET_STATUS,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteUser = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/admin/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: actions.DELETE_USER,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// assign task
export const assignTask = (body) => (dispatch, getState) => {
  axios
    .post('api/task/assign-task', body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: actions.ADD_TASK,
        payload: res.data.doc,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'ASSIGN_TASK_FAIL')
      );
    });
};

export const setUsersLoading = () => {
  return {
    type: actions.USERS_LOADING,
  };
};
