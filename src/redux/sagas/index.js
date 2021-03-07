import { all } from "@redux-saga/core/effects";
import watchCreateTodo from "./createTodo";
import watchGetAllTodos from "./getAllTodos";
import watchDeleteTodo from "./deleteTodo";
import watchDeleteAllTodos from "./deleteAllTodos";
import watchPatchTodo from "./patchTodo";

export default function* rootSaga() {
  yield all([
    watchGetAllTodos(),
    watchCreateTodo(),
    watchPatchTodo(),
    watchDeleteTodo(),
    watchDeleteAllTodos(),
  ])
}