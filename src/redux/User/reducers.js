import actions from './actions';

let initialState = {
  authorized: false,
  authToken: null,
  userData: null,
  loading: false,
  organisations: null,
  loginError: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_DATA:
      return { ...state, ...action.payload };
    case actions.SET_LOADING:
      return { ...state, loading: true };
    case actions.REMOVE_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
}
