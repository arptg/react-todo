import actions from './actions';

let initialState = {
  todos: false,
  labels: null,
  currentTodo: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
