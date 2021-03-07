import * as actionTypes from './actionTypes';

export const getAllTodos = () => ({
  type: actionTypes.GET_ALL_TODOS
});

export const getAllTodosSuccess = (data) => ({
  type: actionTypes.GET_ALL_TODOS_SUCCESS,
  payload: data
});

export const createTodo = (data) => ({
  type: actionTypes.CREATE_TODO,
  payload: data
});

export const createTodoSuccess = (data) => ({
  type: actionTypes.CREATE_TODO_SUCCESS,
  payload: data
});

export const patchTodo = (data) => ({
  type: actionTypes.PATCH_TODO,
  payload: data
});

export const patchTodoSuccess = (data) => ({
  type: actionTypes.PATCH_TODO_SUCCESS,
  payload: data
});

export const deleteTodo = (data) => ({
  type: actionTypes.DELETE_TODO,
  payload: data
});

export const deleteTodoSuccess = (data) => ({
  type: actionTypes.DELETE_TODO_SUCCESS,
  payload: data
});

export const deleteAllTodos = (data) => ({
  type: actionTypes.DELETE_ALL_TODOS,
  payload: data.map(el => el._id)
});

export const deleteAllTodosSuccess = () => ({
  type: actionTypes.DELETE_ALL_TODOS_SUCCESS
});

export const setPatchOn = (data) => ({
  type: actionTypes.SET_PATCH_ON,
  payload: data
});

export const setPatchOff = () => ({
  type: actionTypes.SET_PATCH_OFF
});

export const stopLoader = () => ({
  type: actionTypes.STOP_LOADER
});