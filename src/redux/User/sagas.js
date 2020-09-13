import { all, put, call, takeEvery } from 'redux-saga/effects';
import { history } from 'index';

import Api from './api';
import actions from './actions';
import { message } from 'antd';

import todoActions from '../Todos/actions';

const auth = new Api('user/');

export function* login(action) {
  yield put({
    type: actions.SET_DATA,
    payload: {
      loading: true,
    },
  });
  let { username, password } = action.payload;
  try {
    let userData = yield call(auth.login, username, password);
    yield put({
      type: actions.LOGIN_SUCCESS,
      payload: {
        userData,
      },
    });
    history.push('/');
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail) {
      yield put({
        type: actions.LOGIN_FAIL,
        payload: {
          errorMessage: error.response.data.detail,
        },
      });
    } else {
      yield put({
        type: actions.LOGIN_FAIL,
        payload: {
          errorMessage: 'Could not log you in. Please check Email or Password.',
        },
      });
    }
  }
}

export function* loginSuccess(action) {
  const { userData } = action.payload;
  yield put({
    type: actions.SET_DATA,
    payload: {
      userData,
      loading: false,
      authorized: true,
      loginError: null,
    },
  });

  yield put({
    type: todoActions.GET_TODOS,
  });

  yield put({
    type: todoActions.GET_LABELS,
  });
}

export function* loginFail(action) {
  const { errorMessage } = action.payload;
  yield put({
    type: actions.SET_DATA,
    payload: {
      userData: null,
      authToken: null,
      loading: false,
      authorized: false,
      loginError: errorMessage,
    },
  });
}

export function* logout() {
  yield put({
    type: actions.SET_DATA,
    payload: {
      userData: null,
      authorized: false,
      loading: false,
      authToken: null,
      loginError: null,
    },
  });
  yield auth.afterlogout();
  yield call(history.push, '/user/login');
  message.success('You have been logged out.');
}

export function* registerUser(action) {
  const { username, email, password } = action.payload;
  try {
    yield call(auth.register, username, email, password);
    message.success('Registration Successful.');
    history.push('/user/login');
  } catch (_) {
    message.error('Registration Failed. Try different username.');
  }
}

export function* CHECK_LOGIN() {
  yield put({
    type: actions.SET_DATA,
    payload: {
      loading: true,
    },
  });
  let authorized = yield auth.checkLogin();
  if (authorized) {
    let userData = auth.getUserFromStorage();
    yield put({
      type: actions.LOGIN_SUCCESS,
      payload: {
        userData,
      },
    });
  } else {
    yield put({
      type: actions.LOGIN_FAIL,
      payload: {
        errorMessage: '',
      },
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOGIN, login),
    takeEvery(actions.LOGIN_FAIL, loginFail),
    takeEvery(actions.LOGIN_SUCCESS, loginSuccess),
    takeEvery(actions.LOGOUT, logout),
    takeEvery(actions.REGISTER, registerUser),
    CHECK_LOGIN(), // run once on app load to fetch menu data
  ]);
}
