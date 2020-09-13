import { all } from 'redux-saga/effects';
import User from './User/sagas';
import Todos from './Todos/sagas';

export default function* rootSaga() {
  yield all([User(), Todos()]);
}
