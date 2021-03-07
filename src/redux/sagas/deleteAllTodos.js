import { call, put, takeEvery } from '@redux-saga/core/effects';
import { toast } from "react-toastify";
import deleteAllTodosRequest from '../../api/deleteAllTodosApi';
import { deleteAllTodosSuccess, stopLoader } from '../actions/actionCreators';
import { DELETE_ALL_TODOS } from '../actions/actionTypes';

function* deleteAllTodos(action) {
   try {
      yield call(deleteAllTodosRequest, action.payload);
      yield put(deleteAllTodosSuccess());
      toast.success("All todos deleted successfully.");
   } catch (error) {
      yield put(stopLoader());
      toast.error(error.message);
      console.error(error.message);
   };
};

function* watchDeleteAllTodos() {
  yield takeEvery(DELETE_ALL_TODOS, deleteAllTodos);
};

export default watchDeleteAllTodos;