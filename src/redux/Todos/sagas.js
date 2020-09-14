import { all, put, call, takeEvery } from 'redux-saga/effects';
import { history } from 'index';

import Api from './api';
import actions from './actions';
import { message } from 'antd';

const todo = new Api('todo/');

export function* getLabel() {
  try {
    const labels = yield call(todo.getLabels);
    yield put({
      type: actions.SET_DATA,
      payload: { labels },
    });
  } catch (err) {
    message.error('Could not get labels.');
    yield put({
      type: actions.SET_DATA,
      payload: { labels: null },
    });
  }
}

export function* getTodos() {
  try {
    const todos = yield call(todo.getTodos);
    yield put({
      type: actions.SET_DATA,
      payload: { todos },
    });
  } catch (err) {
    message.error('Could not get todos.');
    yield put({
      type: actions.SET_DATA,
      payload: { todos: null },
    });
  }
}

export function* getCurrentTodo(action) {
  const { id } = action.payload;
  try {
    let currentTodo = yield call(todo.getCurrentTodo, id);
    yield put({
      type: actions.SET_DATA,
      payload: { currentTodo },
    });
  } catch (err) {
    message.error('Could not get Todo information. Try again later.');
    history.goBack();
  }
}

export function* createLabel(action) {
  const { name } = action.payload;
  try {
    yield call(todo.createLabel, name);
    yield put({
      type: actions.GET_LABELS,
    });
    message.success('Label created successfully.');
  } catch (err) {
    message.error(
      'Label creation failed. Please ensure the name is not already in use.'
    );
  }
}

export function* createTodo(action) {
  const { title, description, label } = action.payload;
  try {
    yield call(todo.createTodo, title, description, label);
    yield put({
      type: actions.GET_TODOS,
    });
    message.success('Todo created successfully.');
    history.push('/todos');
  } catch (err) {
    message.error('Todo creation failed. Please try again later.');
    history.push('/todos');
  }
}

export function* updateTodo(action) {
  const { id, title, description, done, label } = action.payload;
  try {
    yield call(todo.updateTodo, id, title, description, done, label);
    yield put({
      type: actions.GET_TODOS,
    });
    message.success('Todo updated successfully.');
    history.push('/todos');
  } catch (err) {
    message.error('Todo updation failed. Please try again later.');
    history.push('/todos');
  }
}

export function* markTodo(action) {
  const { id, title, description, done, label } = action.payload;
  try {
    yield call(todo.updateTodo, id, title, description, done, label);
    yield put({
      type: actions.GET_TODOS,
    });
  } catch (err) {}
}

export function* deleteTodo(action) {
  const { id } = action.payload;
  try {
    yield call(todo.deleteTodo, id);
    yield put({
      type: actions.GET_TODOS,
    });
    message.success('Todo deleted successfully.');
  } catch (err) {
    message.error('Todo deletion failed. Please try again later.');
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_LABELS, getLabel),
    takeEvery(actions.GET_TODOS, getTodos),
    takeEvery(actions.GET_CURRENT_TODO, getCurrentTodo),
    takeEvery(actions.CREATE_LABEL, createLabel),
    takeEvery(actions.CREATE_TODO, createTodo),
    takeEvery(actions.EDIT_TODO, updateTodo),
    takeEvery(actions.MARK_TODO, markTodo),
    takeEvery(actions.DELETE_TODO, deleteTodo),
  ]);
}
