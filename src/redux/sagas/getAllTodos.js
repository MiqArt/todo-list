import { call, put, takeEvery } from '@redux-saga/core/effects';
import { toast } from "react-toastify";
import getAllTodosRequest from '../../api/getAllTodosApi';
import { getAllTodosSuccess, stopLoader } from '../actions/actionCreators';
import { GET_ALL_TODOS } from '../actions/actionTypes';

function* fetchTodos() {
   try {
      const res = yield call(getAllTodosRequest);
      yield put(getAllTodosSuccess(res));
      if(Array.isArray(res) && res.length === 0) {
         toast.success("There are no items to show");
      } else if (Array.isArray(res)) {
         toast.success("Items loaded successfully");
      }
   } catch (error) {
      yield put(stopLoader());
      toast.error(error.message);
      console.error(error.message);
   };
};

function* watchGetAllTodos() {
  yield takeEvery(GET_ALL_TODOS, fetchTodos);
};

export default watchGetAllTodos;