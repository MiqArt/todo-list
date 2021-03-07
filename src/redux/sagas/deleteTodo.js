import { call, put, takeEvery } from '@redux-saga/core/effects';
import { toast } from "react-toastify";
import deleteTodoRequest from '../../api/deleteTodoApi';
import { deleteTodoSuccess, stopLoader } from '../actions/actionCreators';
import { DELETE_TODO } from '../actions/actionTypes';

function* deleteTodo(action) {
   try {
      yield call(deleteTodoRequest, action.payload);
      yield put(deleteTodoSuccess(action.payload));
      toast.success("Deleted successfully.");
   } catch (error) {
      yield put(stopLoader());
      toast.error(error.message);
      console.error(error.message);
   };
};

function* watchDeleteTodo() {
  yield takeEvery(DELETE_TODO, deleteTodo);
};

export default watchDeleteTodo;