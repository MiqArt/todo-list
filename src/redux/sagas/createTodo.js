import { call, put, takeEvery } from '@redux-saga/core/effects';
import { toast } from "react-toastify";
import createTodoRequest from '../../api/createTodoApi';
import { createTodoSuccess, stopLoader } from '../actions/actionCreators';
import { CREATE_TODO } from '../actions/actionTypes';

function* createTodo(action) {
   try {
      const newTodo = yield call(createTodoRequest, action.payload);
      yield put(createTodoSuccess(newTodo));
      toast.success("Added successfully.");
   } catch (error) {
      yield put(stopLoader());
      toast.error(error.message);
      console.error(error.message);
   };
};

function* watchCreateTodo() {
  yield takeEvery(CREATE_TODO, createTodo);
};

export default watchCreateTodo;