import { call, put, takeEvery } from '@redux-saga/core/effects';
import { toast } from "react-toastify";
import patchTodoRequest from '../../api/patchTodoApi';
import { patchTodoSuccess, setPatchOff, stopLoader } from '../actions/actionCreators';
import { PATCH_TODO } from '../actions/actionTypes';

function* patchTodo(action) {
   try {
      const updatedTodo = yield call(patchTodoRequest, action.payload);
      yield put(patchTodoSuccess(updatedTodo));
      yield put(setPatchOff());
      toast.success("Edited successfully.")
   } catch (error) {
      yield put(stopLoader());
      toast.error(error.message);
      console.error(error.message);
   };
};

function* watchPatchTodo() {
  yield takeEvery(PATCH_TODO, patchTodo);
};

export default watchPatchTodo;